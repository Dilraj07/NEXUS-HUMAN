import { useRef, useId, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface DraggableImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

interface FiberDef {
  anchorX: number;
  anchorY: number;
  side: "top" | "bottom" | "left" | "right";
  along: number;
  seed: number; // for per-fiber variation
}

const FIBER_DEFS: FiberDef[] = [
  { anchorX: 0.18, anchorY: 0.0,  side: "top",    along: 0.25, seed: 1  },
  { anchorX: 0.50, anchorY: 0.0,  side: "top",    along: 0.50, seed: 2  },
  { anchorX: 0.82, anchorY: 0.0,  side: "top",    along: 0.75, seed: 3  },
  { anchorX: 0.18, anchorY: 1.0,  side: "bottom", along: 0.25, seed: 4  },
  { anchorX: 0.50, anchorY: 1.0,  side: "bottom", along: 0.50, seed: 5  },
  { anchorX: 0.82, anchorY: 1.0,  side: "bottom", along: 0.75, seed: 6  },
  { anchorX: 0.0,  anchorY: 0.28, side: "left",   along: 0.30, seed: 7  },
  { anchorX: 0.0,  anchorY: 0.72, side: "left",   along: 0.70, seed: 8  },
  { anchorX: 1.0,  anchorY: 0.28, side: "right",  along: 0.30, seed: 9  },
  { anchorX: 1.0,  anchorY: 0.72, side: "right",  along: 0.70, seed: 10 },
];

// Each fiber bundle: central blurred belly + texture strands + highlight
// [lateralOffset, strokeWidth, opacityBase, colorIndex, blurAmount]
type StrandSpec = { off: number; w: number; op: number; col: number; blur: number; twist: number };

const STRAND_SPECS: StrandSpec[] = [
  // Central belly (blurred, thick — creates volumetric muscle body)
  { off: 0,    w: 7,   op: 0.82, col: 0, blur: 4,   twist: 0    },
  // Inner texture strands
  { off: -3.5, w: 2.2, op: 0.65, col: 1, blur: 0.5, twist: 0.8  },
  { off:  3.5, w: 2.2, op: 0.65, col: 1, blur: 0.5, twist: -0.8 },
  // Mid-outer strands
  { off: -7,   w: 1.4, op: 0.45, col: 2, blur: 0,   twist: 1.6  },
  { off:  7,   w: 1.4, op: 0.45, col: 2, blur: 0,   twist: -1.6 },
  // Outer fringe
  { off: -11,  w: 0.6, op: 0.25, col: 3, blur: 0,   twist: 2.4  },
  { off:  11,  w: 0.6, op: 0.25, col: 3, blur: 0,   twist: -2.4 },
  // Edge highlight (the "light catching the top of the cylinder")
  { off: -13,  w: 0.4, op: 0.15, col: 4, blur: 0,   twist: 0    },
];

// Muscle tissue color palette
const STRAND_COLORS = [
  "#B82C20",  // 0: deep oxygenated muscle red (belly)
  "#C83A2C",  // 1: inner fiber, slightly brighter
  "#A02018",  // 2: mid-outer, darker
  "#8A1812",  // 3: outer fringe, very dark
  "#E07868",  // 4: highlight, pinkish fascia
];

function computeFiberPath(
  ax: number, ay: number,
  gx: number, gy: number,
  restLen: number,
  perpOff: number,
  twist: number,
  seed: number
): string {
  const dx = gx - ax, dy = gy - ay;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return `M ${ax} ${ay} L ${gx} ${gy}`;

  const ux = dx / len, uy = dy / len;
  const px = -uy, py = ux; // perpendicular unit

  // Sag: more pronounced for a natural tissue hang
  const stretch = len / Math.max(restLen, 1);
  const sagBase = Math.max(0, 1 - stretch * 0.5) * Math.min(restLen * 0.28, 48);
  // Add slight per-fiber wave for natural irregularity
  const sagWave = Math.sin(seed * 1.37) * sagBase * 0.12;
  const sagAmt = sagBase + sagWave;

  // Offset the strand laterally + add twist (different sag angle per strand)
  const totalOff = perpOff;
  const twistOff = twist * (len / Math.max(restLen * 2, 1)) * 3;

  const oax = ax + px * totalOff;
  const oay = ay + py * totalOff;
  const ogx = gx + px * totalOff;
  const ogy = gy + py * totalOff;

  // Control points: sag in perpendicular direction + twist causes them to crisscross
  const c1x = oax + ux * (len / 3) + px * (sagAmt + twistOff);
  const c1y = oay + uy * (len / 3) + py * (sagAmt + twistOff);
  const c2x = ogx - ux * (len / 3) + px * (sagAmt - twistOff);
  const c2y = ogy - uy * (len / 3) + py * (sagAmt - twistOff);

  return `M ${oax.toFixed(1)} ${oay.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${ogx.toFixed(1)} ${ogy.toFixed(1)}`;
}

export function DraggableImage({ src, alt, className, imgClassName }: DraggableImageProps) {
  const uid = useId();
  const displaceFiltId = `displace-${uid.replace(/:/g, "x")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const fiberSvgRef = useRef<SVGSVGElement>(null);
  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // path refs: [fiberIndex][strandIndex]
  const pathRefs = useRef<(SVGPathElement | null)[][]>(
    FIBER_DEFS.map(() => STRAND_SPECS.map(() => null))
  );
  // endpoint circle refs: [fiberIndex][0=anchor, 1=grip]
  const nodeRefs = useRef<(SVGCircleElement | null)[][]>(
    FIBER_DEFS.map(() => [null, null])
  );

  const restLengths = useRef<number[]>(FIBER_DEFS.map(() => 0));
  const containerSize = useRef({ W: 0, H: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const scaleX = useTransform(() => {
    const lx = x.get(), ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    if (d < 2) return 1;
    const s = Math.tanh(d / 160) * 0.38;
    const cos2 = Math.cos(Math.atan2(ly, lx)) ** 2;
    return 1 + s * cos2 * 0.85 - s * (1 - cos2) * 0.22;
  });
  const scaleY = useTransform(() => {
    const lx = x.get(), ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    if (d < 2) return 1;
    const s = Math.tanh(d / 160) * 0.38;
    const sin2 = Math.sin(Math.atan2(ly, lx)) ** 2;
    return 1 + s * sin2 * 0.85 - s * (1 - sin2) * 0.22;
  });
  const skewX = useTransform(() => {
    const lx = x.get(), ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    return (lx / Math.max(d, 1)) * Math.tanh(d / 140) * 12;
  });
  const skewY = useTransform(() => {
    const lx = x.get(), ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    return (ly / Math.max(d, 1)) * Math.tanh(d / 140) * 12;
  });

  const computeGrip = useCallback((fiber: FiberDef, centerX: number, centerY: number, halfW: number, halfH: number) => {
    switch (fiber.side) {
      case "top":    return { gx: centerX + (fiber.along - 0.5) * halfW * 2, gy: centerY - halfH };
      case "bottom": return { gx: centerX + (fiber.along - 0.5) * halfW * 2, gy: centerY + halfH };
      case "left":   return { gx: centerX - halfW, gy: centerY + (fiber.along - 0.5) * halfH * 2 };
      case "right":  return { gx: centerX + halfW, gy: centerY + (fiber.along - 0.5) * halfH * 2 };
    }
  }, []);

  const updateFibers = useCallback((imgX: number, imgY: number) => {
    const { W, H } = containerSize.current;
    if (!W || !H) return;
    const halfW = W * 0.40, halfH = H * 0.40;
    const centerX = W / 2 + imgX, centerY = H / 2 + imgY;

    FIBER_DEFS.forEach((fiber, fi) => {
      const ax = fiber.anchorX * W, ay = fiber.anchorY * H;
      const { gx, gy } = computeGrip(fiber, centerX, centerY, halfW, halfH);
      const restLen = restLengths.current[fi] || 1;
      const dx = gx - ax, dy = gy - ay;
      const curLen = Math.sqrt(dx * dx + dy * dy);
      const stretch = curLen / restLen;

      // Update endpoint nodes
      const anchorNode = nodeRefs.current[fi]?.[0];
      const gripNode = nodeRefs.current[fi]?.[1];
      if (anchorNode) {
        anchorNode.setAttribute("cx", String(ax));
        anchorNode.setAttribute("cy", String(ay));
      }
      if (gripNode) {
        gripNode.setAttribute("cx", String(gx));
        gripNode.setAttribute("cy", String(gy));
        // Grip node shrinks as the fiber pulls tight
        const nodeR = Math.max(1.5, 3.5 * (1 - Math.min(stretch - 1, 0.8) * 0.6));
        gripNode.setAttribute("r", String(nodeR));
      }

      STRAND_SPECS.forEach((spec, si) => {
        const el = pathRefs.current[fi]?.[si];
        if (!el) return;
        el.setAttribute("d", computeFiberPath(ax, ay, gx, gy, restLen, spec.off, spec.twist, fiber.seed));
        // Opacity: belly stays visible, outer strands fade when stretched
        const fadeStretch = Math.min(Math.max(stretch - 1, 0), 1);
        const op = Math.max(spec.op * 0.2, spec.op * (1 - fadeStretch * 0.5));
        el.setAttribute("opacity", op.toFixed(3));
        // Stroke width: belly thins slightly under tension
        const wScale = si === 0 ? Math.max(0.5, 1 - fadeStretch * 0.4) : Math.max(0.3, 1 - fadeStretch * 0.6);
        el.setAttribute("stroke-width", (spec.w * wScale).toFixed(2));
      });
    });
  }, [computeGrip]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const rect = container.getBoundingClientRect();
      containerSize.current = { W: rect.width, H: rect.height };
      const { W, H } = containerSize.current;
      const halfW = W * 0.40, halfH = H * 0.40;
      const centerX = W / 2, centerY = H / 2;
      FIBER_DEFS.forEach((fiber, fi) => {
        const ax = fiber.anchorX * W, ay = fiber.anchorY * H;
        const { gx, gy } = computeGrip(fiber, centerX, centerY, halfW, halfH);
        restLengths.current[fi] = Math.sqrt((gx - ax) ** 2 + (gy - ay) ** 2);
      });
      updateFibers(0, 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [updateFibers, computeGrip]);

  function updateDisplacement(dist: number) {
    displacementRef.current?.setAttribute("scale", String(Math.min(dist * 0.15, 30)));
  }
  function decayDisplacement() {
    let v = parseFloat(displacementRef.current?.getAttribute("scale") ?? "0");
    const tick = () => {
      v *= 0.82; if (!displacementRef.current) return;
      if (v < 0.3) { displacementRef.current.setAttribute("scale", "0"); return; }
      displacementRef.current.setAttribute("scale", String(v));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <div ref={containerRef} className={`relative select-none overflow-visible ${className ?? ""}`}>
      {/* SVG displacement filter for fleshy drag */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id={displaceFiltId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.032 0.02" numOctaves="4" seed="7" result="noise" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Muscle fiber SVG — behind the image, hidden until drag */}
      <svg
        ref={fiberSvgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: "100%", height: "100%", overflow: "visible",
          opacity: 0,
          transition: "opacity 0.18s ease",
          zIndex: 5,
        }}
        aria-hidden
      >
        {FIBER_DEFS.map((fiber, fi) => (
          <g key={fi}>
            {/* Fiber strands — rendered back-to-front (belly last so it's on top) */}
            {[...STRAND_SPECS].reverse().map((spec, rsi) => {
              const si = STRAND_SPECS.length - 1 - rsi;
              return (
                <path
                  key={si}
                  ref={(el) => { if (pathRefs.current[fi]) pathRefs.current[fi][si] = el; }}
                  d=""
                  fill="none"
                  stroke={STRAND_COLORS[spec.col]}
                  strokeWidth={spec.w}
                  strokeLinecap="round"
                  opacity={spec.op}
                  style={spec.blur > 0 ? { filter: `blur(${spec.blur}px)` } : undefined}
                />
              );
            })}
            {/* Attachment nodes: anchor (on wall) */}
            <circle
              ref={(el) => { if (nodeRefs.current[fi]) nodeRefs.current[fi][0] = el; }}
              cx={fiber.anchorX * 100 + "%"}
              cy={fiber.anchorY * 100 + "%"}
              r="3.5"
              fill="#8A1812"
              opacity="0.55"
            />
            {/* Attachment node: grip (on image) */}
            <circle
              ref={(el) => { if (nodeRefs.current[fi]) nodeRefs.current[fi][1] = el; }}
              cx="0" cy="0" r="3.5"
              fill="#C83A2C"
              opacity="0.65"
            />
          </g>
        ))}
      </svg>

      {/* Draggable image */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        style={{
          x, y, scaleX, scaleY, skewX, skewY,
          filter: `url(#${displaceFiltId})`,
          transformOrigin: "center center",
          willChange: "transform, filter",
          cursor: "grab",
          position: "relative",
          zIndex: 10,
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDragStart={() => {
          if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
          if (fiberSvgRef.current) fiberSvgRef.current.style.opacity = "1";
        }}
        onDrag={(_: unknown, info: { offset: { x: number; y: number } }) => {
          updateDisplacement(Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2));
          updateFibers(info.offset.x, info.offset.y);
        }}
        onDragEnd={() => {
          animate(x, 0, { type: "spring", stiffness: 320, damping: 22, mass: 0.7 });
          animate(y, 0, { type: "spring", stiffness: 320, damping: 22, mass: 0.7 });
          decayDisplacement();
          const u1 = x.on("change", (v) => updateFibers(v, y.get()));
          const u2 = y.on("change", (v) => updateFibers(x.get(), v));
          fadeOutTimer.current = setTimeout(() => {
            u1(); u2(); updateFibers(0, 0);
            if (fiberSvgRef.current) fiberSvgRef.current.style.opacity = "0";
          }, 900);
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`pointer-events-none select-none ${imgClassName ?? ""}`}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

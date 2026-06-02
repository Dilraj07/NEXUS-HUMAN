import { useRef, useId, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface DraggableImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

// Fiber definition: anchor on container edge, grip on image edge
interface FiberDef {
  anchorX: number; // 0–1 of container width
  anchorY: number; // 0–1 of container height
  side: "top" | "bottom" | "left" | "right";
  along: number;  // 0–1 position along the image edge
}

const FIBER_DEFS: FiberDef[] = [
  // Top edge → top of image
  { anchorX: 0.18, anchorY: 0.0, side: "top", along: 0.25 },
  { anchorX: 0.50, anchorY: 0.0, side: "top", along: 0.50 },
  { anchorX: 0.82, anchorY: 0.0, side: "top", along: 0.75 },
  // Bottom edge → bottom of image
  { anchorX: 0.18, anchorY: 1.0, side: "bottom", along: 0.25 },
  { anchorX: 0.50, anchorY: 1.0, side: "bottom", along: 0.50 },
  { anchorX: 0.82, anchorY: 1.0, side: "bottom", along: 0.75 },
  // Left edge → left of image
  { anchorX: 0.0, anchorY: 0.28, side: "left", along: 0.30 },
  { anchorX: 0.0, anchorY: 0.72, side: "left", along: 0.70 },
  // Right edge → right of image
  { anchorX: 1.0, anchorY: 0.28, side: "right", along: 0.30 },
  { anchorX: 1.0, anchorY: 0.72, side: "right", along: 0.70 },
];

// Strands per fiber: [perpendicular offset in px, opacity multiplier, width multiplier]
const STRAND_DEFS = [
  { offset: -2.5, opacityMult: 0.7, widthMult: 0.65 },
  { offset: 0,    opacityMult: 1.0, widthMult: 1.0  },
  { offset: 2.5,  opacityMult: 0.6, widthMult: 0.55 },
];

function computeFiberPath(
  ax: number, ay: number,
  gx: number, gy: number,
  restLength: number,
  perpOffset: number
): string {
  const dx = gx - ax;
  const dy = gy - ay;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return `M ${ax} ${ay} L ${gx} ${gy}`;

  // Unit perpendicular
  const px = -dy / len;
  const py = dx / len;

  // Sag: decreases as fiber stretches
  const stretch = len / Math.max(restLength, 1);
  const sagAmt = Math.max(0, 1 - stretch * 0.65) * Math.min(restLength * 0.22, 36);

  // Offset the strand laterally
  const oax = ax + px * perpOffset;
  const oay = ay + py * perpOffset;
  const ogx = gx + px * perpOffset;
  const ogy = gy + py * perpOffset;

  const c1x = oax + (dx / 3) + px * sagAmt;
  const c1y = oay + (dy / 3) + py * sagAmt;
  const c2x = ogx - (dx / 3) + px * sagAmt;
  const c2y = ogy - (dy / 3) + py * sagAmt;

  return `M ${oax.toFixed(2)} ${oay.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${ogx.toFixed(2)} ${ogy.toFixed(2)}`;
}

export function DraggableImage({ src, alt, className, imgClassName }: DraggableImageProps) {
  const uid = useId();
  const filterId = `flesh-${uid.replace(/:/g, "x")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  // fiberPathRefs[fiberIndex][strandIndex] → SVGPathElement
  const fiberPathRefs = useRef<(SVGPathElement | null)[][]>(
    FIBER_DEFS.map(() => STRAND_DEFS.map(() => null))
  );
  const fiberRestLengths = useRef<number[]>(FIBER_DEFS.map(() => 0));
  const containerSize = useRef({ width: 0, height: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fleshy squash-and-stretch
  const scaleX = useTransform(() => {
    const lx = x.get(); const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    if (d < 2) return 1;
    const stretch = Math.tanh(d / 160) * 0.38;
    const cos2 = Math.cos(Math.atan2(ly, lx)) ** 2;
    return 1 + stretch * cos2 * 0.85 - stretch * (1 - cos2) * 0.22;
  });
  const scaleY = useTransform(() => {
    const lx = x.get(); const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    if (d < 2) return 1;
    const stretch = Math.tanh(d / 160) * 0.38;
    const sin2 = Math.sin(Math.atan2(ly, lx)) ** 2;
    return 1 + stretch * sin2 * 0.85 - stretch * (1 - sin2) * 0.22;
  });
  const skewX = useTransform(() => {
    const lx = x.get(); const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    return (lx / Math.max(d, 1)) * Math.tanh(d / 140) * 12;
  });
  const skewY = useTransform(() => {
    const lx = x.get(); const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    return (ly / Math.max(d, 1)) * Math.tanh(d / 140) * 12;
  });

  // Compute and update all fiber paths imperatively
  const updateFibers = useCallback((imgX: number, imgY: number) => {
    const { width: W, height: H } = containerSize.current;
    if (!W || !H) return;

    const halfW = W * 0.40;
    const halfH = H * 0.40;
    const centerX = W / 2 + imgX;
    const centerY = H / 2 + imgY;

    FIBER_DEFS.forEach((fiber, fi) => {
      const ax = fiber.anchorX * W;
      const ay = fiber.anchorY * H;

      let gx = 0, gy = 0;
      switch (fiber.side) {
        case "top":
          gx = centerX + (fiber.along - 0.5) * halfW * 2;
          gy = centerY - halfH;
          break;
        case "bottom":
          gx = centerX + (fiber.along - 0.5) * halfW * 2;
          gy = centerY + halfH;
          break;
        case "left":
          gx = centerX - halfW;
          gy = centerY + (fiber.along - 0.5) * halfH * 2;
          break;
        case "right":
          gx = centerX + halfW;
          gy = centerY + (fiber.along - 0.5) * halfH * 2;
          break;
      }

      const restLen = fiberRestLengths.current[fi] || 1;
      const dx = gx - ax, dy = gy - ay;
      const curLen = Math.sqrt(dx * dx + dy * dy);
      const stretch = curLen / restLen;

      STRAND_DEFS.forEach((strand, si) => {
        const el = fiberPathRefs.current[fi]?.[si];
        if (!el) return;

        el.setAttribute("d", computeFiberPath(ax, ay, gx, gy, restLen, strand.offset));

        const baseOpacity = 0.42;
        const opacity = Math.max(0.12, baseOpacity * strand.opacityMult * (1 - Math.min(stretch - 1, 0.8) * 0.55));
        const strokeW = Math.max(0.4, 1.8 * strand.widthMult * (1 - Math.min(stretch - 1, 1) * 0.45));

        el.setAttribute("opacity", opacity.toFixed(3));
        el.setAttribute("stroke-width", strokeW.toFixed(2));
      });
    });
  }, []);

  // Compute rest lengths after mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      containerSize.current = { width: rect.width, height: rect.height };
      const W = rect.width, H = rect.height;
      const halfW = W * 0.40, halfH = H * 0.40;
      const centerX = W / 2, centerY = H / 2;

      FIBER_DEFS.forEach((fiber, fi) => {
        const ax = fiber.anchorX * W, ay = fiber.anchorY * H;
        let gx = 0, gy = 0;
        switch (fiber.side) {
          case "top": gx = centerX + (fiber.along - 0.5) * halfW * 2; gy = centerY - halfH; break;
          case "bottom": gx = centerX + (fiber.along - 0.5) * halfW * 2; gy = centerY + halfH; break;
          case "left": gx = centerX - halfW; gy = centerY + (fiber.along - 0.5) * halfH * 2; break;
          case "right": gx = centerX + halfW; gy = centerY + (fiber.along - 0.5) * halfH * 2; break;
        }
        fiberRestLengths.current[fi] = Math.sqrt((gx - ax) ** 2 + (gy - ay) ** 2);
      });

      updateFibers(0, 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [updateFibers]);

  function updateDisplacement(dist: number) {
    if (displacementRef.current) {
      displacementRef.current.setAttribute("scale", String(Math.min(dist * 0.15, 30)));
    }
  }

  function decayDisplacement() {
    if (!displacementRef.current) return;
    let v = parseFloat(displacementRef.current.getAttribute("scale") ?? "0");
    const tick = () => {
      v *= 0.82;
      if (!displacementRef.current) return;
      if (v < 0.3) { displacementRef.current.setAttribute("scale", "0"); return; }
      displacementRef.current.setAttribute("scale", String(v));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <div ref={containerRef} className={`relative select-none overflow-visible ${className ?? ""}`}>
      {/* SVG displacement filter */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.032 0.02" numOctaves="4" seed="7" result="noise" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Muscle fiber SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ overflow: "visible" }}
        aria-hidden
      >
        {FIBER_DEFS.map((_, fi) =>
          STRAND_DEFS.map((strand, si) => (
            <path
              key={`${fi}-${si}`}
              ref={(el) => {
                if (fiberPathRefs.current[fi]) {
                  fiberPathRefs.current[fi][si] = el;
                }
              }}
              d=""
              fill="none"
              stroke={si === 1 ? "#B8603C" : "#D4906A"}
              strokeWidth={si === 1 ? "1.8" : "1.0"}
              strokeLinecap="round"
              opacity={strand.opacityMult * 0.42}
            />
          ))
        )}
      </svg>

      {/* Draggable image */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        style={{
          x,
          y,
          scaleX,
          scaleY,
          skewX,
          skewY,
          filter: `url(#${filterId})`,
          transformOrigin: "center center",
          willChange: "transform, filter",
          cursor: "grab",
          position: "relative",
          zIndex: 10,
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDrag={(_: unknown, info: { offset: { x: number; y: number } }) => {
          const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
          updateDisplacement(dist);
          updateFibers(info.offset.x, info.offset.y);
        }}
        onDragEnd={() => {
          animate(x, 0, { type: "spring", stiffness: 320, damping: 22, mass: 0.7 });
          animate(y, 0, { type: "spring", stiffness: 320, damping: 22, mass: 0.7 });
          decayDisplacement();
          // Animate fibers back by tracking x motion value
          const unsubX = x.on("change", (v) => updateFibers(v, y.get()));
          const unsubY = y.on("change", (v) => updateFibers(x.get(), v));
          setTimeout(() => { unsubX(); unsubY(); updateFibers(0, 0); }, 1200);
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

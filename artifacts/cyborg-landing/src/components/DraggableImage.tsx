import { useRef, useId } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface DraggableImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function DraggableImage({ src, alt, className, imgClassName }: DraggableImageProps) {
  const uid = useId();
  const filterId = `flesh-${uid.replace(/:/g, "x")}`;
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fleshy squash-and-stretch: stretches along drag axis, squashes perpendicular
  const scaleX = useTransform(() => {
    const lx = x.get();
    const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    if (d < 2) return 1;
    const stretch = Math.tanh(d / 160) * 0.38;
    const angle = Math.atan2(ly, lx);
    const cos2 = Math.cos(angle) ** 2;
    // Stretch along horizontal drag, squash along vertical
    return 1 + stretch * cos2 * 0.85 - stretch * (1 - cos2) * 0.22;
  });

  const scaleY = useTransform(() => {
    const lx = x.get();
    const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    if (d < 2) return 1;
    const stretch = Math.tanh(d / 160) * 0.38;
    const angle = Math.atan2(ly, lx);
    const sin2 = Math.sin(angle) ** 2;
    // Stretch along vertical drag, squash along horizontal
    return 1 + stretch * sin2 * 0.85 - stretch * (1 - sin2) * 0.22;
  });

  // Shear / skew — makes it feel like flesh being pulled
  const skewX = useTransform(() => {
    const lx = x.get();
    const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    return (lx / Math.max(d, 1)) * Math.tanh(d / 140) * 12;
  });

  const skewY = useTransform(() => {
    const lx = x.get();
    const ly = y.get();
    const d = Math.sqrt(lx * lx + ly * ly);
    return (ly / Math.max(d, 1)) * Math.tanh(d / 140) * 12;
  });

  function updateDisplacement(dragDist: number) {
    if (displacementRef.current) {
      const scale = Math.min(dragDist * 0.16, 32);
      displacementRef.current.setAttribute("scale", String(scale));
    }
  }

  function decayDisplacement() {
    if (!displacementRef.current) return;
    let current = parseFloat(displacementRef.current.getAttribute("scale") ?? "0");
    function decay() {
      current *= 0.8;
      if (displacementRef.current) {
        if (current < 0.4) {
          displacementRef.current.setAttribute("scale", "0");
        } else {
          displacementRef.current.setAttribute("scale", String(current));
          requestAnimationFrame(decay);
        }
      }
    }
    requestAnimationFrame(decay);
  }

  function handleDrag(_: PointerEvent, info: { offset: { x: number; y: number } }) {
    const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    updateDisplacement(dist);
  }

  function handleDragEnd() {
    animate(x, 0, { type: "spring", stiffness: 320, damping: 22, mass: 0.7 });
    animate(y, 0, { type: "spring", stiffness: 320, damping: 22, mass: 0.7 });
    decayDisplacement();
  }

  return (
    <div className={`relative select-none overflow-visible ${className ?? ""}`}>
      {/* Hidden SVG filter — feTurbulence creates organic noise, feDisplacementMap warps the image */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden
      >
        <defs>
          <filter
            id={filterId}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.032 0.02"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

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
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDrag={handleDrag as any}
        onDragEnd={handleDragEnd}
      >
        <img
          src={src}
          alt={alt}
          className={`pointer-events-none select-none ${imgClassName ?? ""}`}
          draggable={false}
        />
      </motion.div>

      {/* Drag hint */}
      <div className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest text-current opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
        drag
      </div>
    </div>
  );
}

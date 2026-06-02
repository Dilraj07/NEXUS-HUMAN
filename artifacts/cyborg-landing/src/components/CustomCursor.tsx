import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 700, damping: 40, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 700, damping: 40, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        aria-hidden
      >
        {/* Outer crosshair ring */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Crosshair lines */}
          <line x1="16" y1="0" x2="16" y2="6" stroke="#C8922A" strokeWidth="1.2" />
          <line x1="16" y1="26" x2="16" y2="32" stroke="#C8922A" strokeWidth="1.2" />
          <line x1="0" y1="16" x2="6" y2="16" stroke="#C8922A" strokeWidth="1.2" />
          <line x1="26" y1="16" x2="32" y2="16" stroke="#C8922A" strokeWidth="1.2" />
          {/* Center dot */}
          <circle cx="16" cy="16" r="1.4" fill="#C8922A" />
          {/* Corner brackets */}
          <path d="M9 6 L6 6 L6 9" stroke="#0E0E12" strokeWidth="1" opacity="0.5" />
          <path d="M23 6 L26 6 L26 9" stroke="#0E0E12" strokeWidth="1" opacity="0.5" />
          <path d="M9 26 L6 26 L6 23" stroke="#0E0E12" strokeWidth="1" opacity="0.5" />
          <path d="M23 26 L26 26 L26 23" stroke="#0E0E12" strokeWidth="1" opacity="0.5" />
        </svg>
      </motion.div>
    </>
  );
}

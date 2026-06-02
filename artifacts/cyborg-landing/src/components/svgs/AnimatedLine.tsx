import { SVGProps, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedLine({ className, ...props }: SVGProps<SVGSVGElement>) {
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.path
        d="M100 0V200L150 250V400L50 500V600L100 650V800"
        stroke="currentColor"
        strokeWidth="1"
        style={{ pathLength }}
      />
      <motion.circle
        cx="150"
        cy="250"
        r="3"
        fill="currentColor"
        style={{ opacity: pathLength }}
      />
      <motion.circle
        cx="50"
        cy="500"
        r="3"
        fill="currentColor"
        style={{ opacity: pathLength }}
      />
    </svg>
  );
}

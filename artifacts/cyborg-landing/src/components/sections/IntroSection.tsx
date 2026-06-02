import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TechGrid } from "@/components/svgs/TechGrid";
import { CircuitTrace } from "@/components/svgs/CircuitTrace";

export function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80svh] w-full bg-foreground text-background py-32 overflow-hidden dark"
    >
      <TechGrid className="text-muted-foreground opacity-10" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex justify-center mb-24">
          <CircuitTrace className="text-accent w-24 h-24" />
        </div>

        <motion.div
          style={{ y: yText }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12"
          >
            THE BODY IS NOT A LIMIT.
            <br />
            <span className="text-muted-foreground italic font-serif lowercase font-normal">It is a foundation.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left"
          >
            <div>
              <p className="font-mono text-muted-foreground leading-relaxed text-sm md:text-base">
                For centuries, we adapted our tools to fit our bodies. The next leap is adapting our bodies to match our intent. Nexus Human builds the bridge between biological vulnerability and mechanical permanence.
              </p>
            </div>
            <div>
              <p className="font-mono text-muted-foreground leading-relaxed text-sm md:text-base">
                Every articulation, every neural mesh, every titanium vertebrae is machined with an obsessive focus on harmony. We do not replace the human; we elevate the design.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

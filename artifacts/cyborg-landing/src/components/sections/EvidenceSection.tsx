import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedLine } from "@/components/svgs/AnimatedLine";

export function EvidenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const stats = [
    { value: "0.01", unit: "ms", label: "Neural Latency" },
    { value: "10x", unit: "", label: "Tensile Strength" },
    { value: "99.9", unit: "%", label: "Biocompatibility" },
  ];

  return (
    <section ref={containerRef} className="relative py-40 bg-foreground text-background dark overflow-hidden border-t border-border">
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 opacity-20 pointer-events-none">
        <AnimatedLine className="h-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-accent text-sm tracking-[0.3em] uppercase block mb-6 font-bold">Metrics</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase mb-24 text-balance">The math<br/>is absolute.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent" style={{ WebkitTextStroke: '1px currentColor' }}>
                <span className="group-hover:text-background group-hover:[-webkit-text-stroke:0px] transition-all duration-300">
                  {stat.value}
                </span>
                <span className="text-3xl md:text-4xl text-muted-foreground [-webkit-text-stroke:0px] ml-1">{stat.unit}</span>
              </div>
              <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

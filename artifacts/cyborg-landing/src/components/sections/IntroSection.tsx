import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "Biological Harmony",
    desc: "Every component is biocompatible to ISO 10993 standards. The body does not reject what it cannot distinguish from itself.",
  },
  {
    num: "02",
    title: "Mechanical Permanence",
    desc: "Carbon fiber lattice structures with Ti-6Al-4V joints. Fatigue life exceeds biological equivalents by a factor of twelve.",
  },
  {
    num: "03",
    title: "Neural Fidelity",
    desc: "Sub-millisecond signal propagation. The augmentation responds before conscious intent completes its arc.",
  },
];

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="systems" ref={ref} className="relative bg-[#0E0E12] text-[#F5F4F0] py-28 md:py-36 overflow-hidden">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none">
        <defs>
          <pattern id="intro-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#F5F4F0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#intro-dots)" />
      </svg>

      {/* Amber vertical accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C8922A]/60 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div style={{ y }} className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-8 h-px bg-[#C8922A]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8922A]">
              Protocol // 002 — Foundation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.9] tracking-tight uppercase mb-6"
          >
            The Body Is
            <br />
            Not A Limit.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-serif italic text-[clamp(1.25rem,2.5vw,2rem)] text-[#C8922A] mb-16"
          >
            It is a foundation.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="pt-10 pb-10 pr-8 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="font-mono text-[10px] text-[#C8922A] tracking-widest mb-5 uppercase">{p.num}</div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#F5F4F0] mb-4 group-hover:text-[#C8922A] transition-colors duration-300">
                {p.title}
              </h3>
              <p className="font-mono text-xs text-[#F5F4F0]/50 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

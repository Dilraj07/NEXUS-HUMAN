import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedLine } from "@/components/svgs/AnimatedLine";

const stats = [
  { value: "0.01", unit: "ms", label: "Neural Latency", sub: "Signal propagation" },
  { value: "12×", unit: "", label: "Tensile Strength", sub: "vs. biological bone" },
  { value: "99.9", unit: "%", label: "Biocompatibility", sub: "ISO 10993 certified" },
];

const testimonials = [
  {
    quote: "The latency is so low it doesn't feel like augmentation. It feels like a memory you always had.",
    author: "Dr. K. Oshiro",
    role: "Lead Implant Surgeon",
  },
  {
    quote: "We don't think of it as prosthetics. We think of it as an upgrade to a system that was already brilliant.",
    author: "M. Chen",
    role: "Principal Engineer",
  },
];

export function EvidenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="metrics" ref={ref} className="relative bg-[#0E0E12] py-28 md:py-36 overflow-hidden">
      {/* Animated vertical line decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px opacity-20 pointer-events-none">
        <AnimatedLine className="h-full w-[2px]" />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C8922A]/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-[#C8922A]" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8922A]">
            Protocol // 006 — Evidence
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.9] tracking-tight text-[#F5F4F0] mb-4"
        >
          The Math
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif italic text-[clamp(1.25rem,2.5vw,2.5rem)] text-[#C8922A] mb-20"
        >
          is absolute.
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10 mb-24">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12 }}
              className="pt-10 pb-10 pr-10 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 group"
            >
              <div className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold leading-none tracking-tighter text-transparent mb-3 transition-all duration-500 group-hover:text-[#F5F4F0]"
                style={{ WebkitTextStroke: "1px rgba(245,244,240,0.35)" }}>
                {s.value}
                <span className="text-[0.4em] text-[#C8922A] [-webkit-text-stroke:0px] align-top mt-4 inline-block ml-1">{s.unit}</span>
              </div>
              <div className="font-mono text-sm font-bold text-[#F5F4F0] uppercase tracking-wider mb-1">{s.label}</div>
              <div className="font-mono text-[10px] text-[#F5F4F0]/40 uppercase tracking-widest">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
              className="border border-white/10 p-8 hover:border-[#C8922A]/40 transition-colors duration-300"
            >
              <div className="font-mono text-[#C8922A] text-2xl mb-4 leading-none">"</div>
              <p className="font-mono text-sm text-[#F5F4F0]/75 leading-relaxed mb-6 italic">
                {t.quote}
              </p>
              <div className="border-t border-white/10 pt-5">
                <div className="font-mono text-xs font-bold text-[#F5F4F0] uppercase tracking-wider">{t.author}</div>
                <div className="font-mono text-[10px] text-[#F5F4F0]/40 uppercase tracking-widest mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

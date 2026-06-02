import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reticle } from "@/components/svgs/Reticle";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="cta" ref={ref} className="relative bg-[#F5F4F0] py-28 md:py-40 overflow-hidden">
      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
        <defs>
          <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0E0E12" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      {/* Decorative amber line top */}
      <div className="absolute top-0 left-12 right-12 h-px bg-[#C8922A]/30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-12"
          >
            <Reticle className="w-10 h-10 text-[#C8922A]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-[#0E0E12]/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0E0E12]/50">
              Protocol // 007 — Registry
            </span>
            <div className="w-12 h-px bg-[#0E0E12]/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(5rem,14vw,14rem)] font-bold uppercase leading-[0.85] tracking-tighter text-[#0E0E12] mb-10"
          >
            Evolve.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-sm text-[#0E0E12]/60 max-w-lg mx-auto mb-14 leading-relaxed"
          >
            The next iteration of human form is not coming. It is here. Join the registry for priority access to our structural and neural augmentation programs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 bg-[#0E0E12] text-[#F5F4F0] font-mono text-xs uppercase tracking-widest hover:bg-[#C8922A] transition-colors duration-300"
              data-testid="button-join-registry"
            >
              <span className="absolute inset-[3px] border border-white/10 pointer-events-none" />
              Join the Registry
              <span className="text-base leading-none">→</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 border border-[#0E0E12]/25 text-[#0E0E12] font-mono text-xs uppercase tracking-widest hover:border-[#C8922A] hover:text-[#C8922A] transition-all duration-300"
              data-testid="button-read-manifesto"
            >
              Read Manifesto
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#0E0E12]/10">
        <div className="container mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <div className="font-mono text-[10px] text-[#0E0E12]/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Nexus Human
          </div>
          <div className="hidden md:flex gap-8">
            {["Manifesto", "Clinical Data", "Privacy", "Contact"].map((link) => (
              <a key={link} href="#" className="font-mono text-[10px] text-[#0E0E12]/40 hover:text-[#0E0E12] transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
          </div>
          <div className="font-mono text-[10px] text-[#0E0E12]/40 uppercase tracking-widest">
            Syndicate // 09
          </div>
        </div>
      </div>
    </section>
  );
}

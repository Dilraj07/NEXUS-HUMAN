import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroArmImg from "@/assets/images/hero-arm.png";
import { Reticle } from "@/components/svgs/Reticle";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F5F4F0] overflow-hidden flex flex-col justify-center"
    >
      {/* Subtle grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0E0E12" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="container mx-auto px-6 md:px-12 pt-28 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[80vh]">

          {/* LEFT: Text */}
          <motion.div style={{ y: yText, opacity }} className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <Reticle className="w-5 h-5 text-[#C8922A]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0E0E12]/50 font-bold">
                Protocol // 001 — Human Augmentation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.88] tracking-tight text-[#0E0E12] uppercase mb-6"
            >
              Where<br />
              Flesh<br />
              Ends,
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.75rem,3.5vw,3.5rem)] italic text-[#C8922A] leading-tight mb-10"
            >
              design begins.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-mono text-sm text-[#0E0E12]/60 leading-relaxed max-w-sm mb-12"
            >
              NEXUS HUMAN builds precision-engineered augmentation systems for the human body. Not science fiction. The next evolution of human design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <a
                href="#systems"
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#0E0E12] text-[#F5F4F0] font-mono text-xs uppercase tracking-widest hover:bg-[#C8922A] transition-colors duration-300"
              >
                Explore Systems
                <span className="text-base leading-none">→</span>
              </a>
              <a
                href="#technology"
                className="font-mono text-xs uppercase tracking-widest text-[#0E0E12]/50 hover:text-[#0E0E12] transition-colors underline-offset-4 hover:underline"
              >
                Technology
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            style={{ y: yImage }}
            className="relative flex items-center justify-center h-[55vh] lg:h-[80vh]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Corner bracket decorations */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#C8922A]/60 z-10" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#C8922A]/60 z-10" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#C8922A]/60 z-10" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#C8922A]/60 z-10" />

            {/* Scan line accent */}
            <div className="absolute left-6 right-6 top-1/2 h-px bg-[#C8922A]/20 z-10" />

            <img
              src={heroArmImg}
              alt="Nexus Human Augmentation System"
              className="w-full h-full object-contain relative z-0 drop-shadow-2xl"
            />

            {/* Floating spec tag */}
            <div className="absolute bottom-8 right-8 bg-[#0E0E12] text-[#F5F4F0] px-4 py-3 font-mono text-[10px] tracking-widest uppercase z-20">
              <div className="text-[#C8922A] mb-1">MODEL A-1</div>
              <div className="text-white/60">Upper Limb Augmentation</div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0E0E12]/40">Scroll</span>
        <div className="w-px h-12 bg-[#0E0E12]/20 overflow-hidden relative">
          <motion.div
            className="w-full bg-[#C8922A] absolute top-0"
            animate={{ height: ["0%", "100%"], top: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

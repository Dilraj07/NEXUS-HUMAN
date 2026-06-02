import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import labSceneImg from "@/assets/images/lab-scene.png";

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="lab" ref={ref} className="relative bg-[#F5F4F0] py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-start justify-between mb-12 gap-6 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-[#C8922A]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0E0E12]/50">
                Protocol // 005 — Facility
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,5rem)] font-bold uppercase leading-[0.9] tracking-tight text-[#0E0E12]">
              The<br />Laboratory.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-mono text-xs text-[#0E0E12]/55 leading-relaxed max-w-xs self-end pb-2"
          >
            Clinical precision in a gallery-grade environment. Every surface, every instrument, every decision is deliberate.
          </motion.p>
        </div>

        {/* Full-bleed parallax image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          ref={imgRef}
          className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden border border-[#0E0E12]/10"
        >
          <motion.div
            style={{ y: yParallax }}
            className="absolute inset-[-80px] w-[calc(100%+160px)] h-[calc(100%+160px)]"
          >
            <img
              src={labSceneImg}
              alt="Nexus Human Laboratory Facility"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay with facility tag */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12]/60 via-transparent to-transparent" />

          <div className="absolute top-5 left-5 bg-[#0E0E12]/80 backdrop-blur-sm px-3 py-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/70">Facility // Alpha-04</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-8 py-8 flex justify-between items-end">
            <div>
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">Location</div>
              <div className="font-display text-lg font-bold text-white uppercase">Research Campus — Sector 7</div>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">Status</div>
              <div className="font-mono text-xs text-[#C8922A] uppercase">Operational</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-[#0E0E12]/10 mt-0"
        >
          {[
            { label: "Clean Rooms", value: "6" },
            { label: "Engineers", value: "140+" },
            { label: "Patents Filed", value: "83" },
            { label: "Est.", value: "2019" },
          ].map((item) => (
            <div key={item.label} className="py-6 pr-6 border-r border-[#0E0E12]/10 last:border-r-0">
              <div className="font-display text-3xl font-bold text-[#0E0E12] mb-1">{item.value}</div>
              <div className="font-mono text-[10px] text-[#0E0E12]/40 uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

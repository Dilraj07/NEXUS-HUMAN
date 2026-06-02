import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import eyeBlueprintImg from "@/assets/images/eye-blueprint.png";
import { Reticle } from "@/components/svgs/Reticle";
import { DraggableImage } from "@/components/DraggableImage";

const specs = [
  { label: "Spectrum Range", value: "300nm – 1100nm" },
  { label: "Latency", value: "< 0.2ms" },
  { label: "Casing Material", value: "Sapphire Glass / Ti-6Al-4V" },
  { label: "Implant Class", value: "III — Neural Interface" },
  { label: "Power Source", value: "Bioelectric Harvest" },
];

export function TechSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="technology" ref={ref} className="relative bg-[#F5F4F0] py-28 md:py-36 overflow-visible">
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C8922A]/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px bg-[#C8922A]" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0E0E12]/50">
            Protocol // 003 — Ocular Systems
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Draggable Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="relative aspect-square bg-white border border-[#0E0E12]/8 overflow-visible">
              <DraggableImage
                src={eyeBlueprintImg}
                alt="Ocular Augmentation Blueprint"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
              <Reticle className="absolute top-4 left-4 w-6 h-6 text-[#C8922A] pointer-events-none z-10" />
              <Reticle className="absolute bottom-4 right-4 w-6 h-6 text-[#C8922A] rotate-180 pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0E0E12] px-5 py-3 flex justify-between items-center z-10 pointer-events-none">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">Nexus Ocular — X4</span>
                <span className="font-mono text-[10px] text-[#C8922A]">Hold + Drag</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0E0E12] mb-8 self-start">
              <div className="w-1.5 h-1.5 bg-[#C8922A]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">Ocular Augmentation</span>
            </div>

            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.9] tracking-tight text-[#0E0E12] mb-6">
              Perception<br />
              <span className="text-[#C8922A]">Redefined.</span>
            </h2>

            <p className="font-mono text-xs text-[#0E0E12]/60 leading-relaxed mb-10 max-w-md">
              The layered lens intercepts photons before retinal contact — filtering, magnifying, and analyzing data streams in real-time. Housed in a sub-millimeter sapphire casing. Bioelectrically powered. Invisible at inspection range.
            </p>

            <div className="border-t border-[#0E0E12]/10">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.07 }}
                  className="flex justify-between items-center py-4 border-b border-[#0E0E12]/10 group hover:bg-[#0E0E12]/[0.02] transition-colors"
                >
                  <span className="font-mono text-[11px] text-[#0E0E12]/50 uppercase tracking-wider">{s.label}</span>
                  <span className="font-mono text-[11px] font-bold text-[#0E0E12] group-hover:text-[#C8922A] transition-colors">{s.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

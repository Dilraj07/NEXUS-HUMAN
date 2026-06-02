import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import spineImg from "@/assets/images/spine-render.png";
import chipImg from "@/assets/images/neural-chip.png";

const features = [
  {
    id: "01",
    tag: "Structural System",
    title: "Exoskeletal Spine",
    desc: "Carbon fiber lattice vertebrae interlocked with medical-grade titanium joints. Load tolerance exceeds human bone by 12×. Zero fatigue degradation in stress testing over 50-year cycles.",
    stats: [
      { label: "Tensile Strength", value: "2,340 MPa" },
      { label: "Weight", value: "340g / segment" },
      { label: "Flex Range", value: "±45°" },
    ],
    image: spineImg,
  },
  {
    id: "02",
    tag: "Neural System",
    title: "Interface Chip",
    desc: "Fingernail-scale neural bridge chip. 4,096 electrodes per mm² form a bidirectional signal mesh. Intent becomes action before conscious processing completes.",
    stats: [
      { label: "Electrode Density", value: "4,096 / mm²" },
      { label: "Signal Latency", value: "0.01ms" },
      { label: "Biocompatibility", value: "99.9%" },
    ],
    image: chipImg,
  },
];

export function StickyFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.38, 0.48], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.48], [0, -40]);
  const opacity2 = useTransform(scrollYProgress, [0.42, 0.52, 1], [0, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.42, 0.6], [40, 0]);

  const imgOpacity1 = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const imgOpacity2 = useTransform(scrollYProgress, [0.4, 0.55, 1], [0, 1, 1]);

  return (
    <section id="systems" ref={containerRef} className="relative h-[200vh] bg-[#0E0E12]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
          <defs>
            <pattern id="sticky-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#F5F4F0" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sticky-dots)" />
        </svg>

        <div className="container mx-auto px-6 md:px-12 w-full relative z-10">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-[#C8922A]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8922A]">
              Protocol // 004 — Core Systems
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT: Switching text content */}
            <div className="relative h-[420px]">

              {/* Feature 1 */}
              <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8922A] mb-3">
                  {features[0].id} / {features[0].tag}
                </div>
                <h3 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.9] text-[#F5F4F0] mb-6">
                  {features[0].title}
                </h3>
                <p className="font-mono text-xs text-[#F5F4F0]/55 leading-relaxed max-w-md mb-8">
                  {features[0].desc}
                </p>
                <div className="grid grid-cols-3 gap-0 border-t border-white/10 pt-6">
                  {features[0].stats.map((s) => (
                    <div key={s.label} className="pr-4">
                      <div className="font-mono text-xs font-bold text-[#F5F4F0] mb-1">{s.value}</div>
                      <div className="font-mono text-[10px] text-[#F5F4F0]/40 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8922A] mb-3">
                  {features[1].id} / {features[1].tag}
                </div>
                <h3 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.9] text-[#F5F4F0] mb-6">
                  {features[1].title}
                </h3>
                <p className="font-mono text-xs text-[#F5F4F0]/55 leading-relaxed max-w-md mb-8">
                  {features[1].desc}
                </p>
                <div className="grid grid-cols-3 gap-0 border-t border-white/10 pt-6">
                  {features[1].stats.map((s) => (
                    <div key={s.label} className="pr-4">
                      <div className="font-mono text-xs font-bold text-[#F5F4F0] mb-1">{s.value}</div>
                      <div className="font-mono text-[10px] text-[#F5F4F0]/40 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Switching image */}
            <div className="relative h-[480px] lg:h-[520px]">
              {/* Image 1 */}
              <motion.div
                style={{ opacity: imgOpacity1 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full border border-white/10 bg-white/[0.02]">
                  <img src={features[0].image} alt={features[0].title} className="w-full h-full object-contain p-8" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#C8922A]/80" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#C8922A]/80" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#C8922A]/80" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#C8922A]/80" />
                </div>
              </motion.div>

              {/* Image 2 */}
              <motion.div
                style={{ opacity: imgOpacity2 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full border border-[#C8922A]/30 bg-white/[0.02]">
                  <img src={features[1].image} alt={features[1].title} className="w-full h-full object-contain p-8" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#C8922A]" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#C8922A]" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#C8922A]" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#C8922A]" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

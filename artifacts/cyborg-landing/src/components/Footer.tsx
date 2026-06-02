import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Reticle } from "@/components/svgs/Reticle";

const footerLinks = {
  Systems: ["Upper Limb", "Spinal Augmentation", "Ocular Interface", "Neural Mesh"],
  Technology: ["Bioelectric Power", "Carbon Composites", "Neural Sync", "Research Papers"],
  Company: ["Manifesto", "Laboratory", "Clinical Data", "Careers"],
  Legal: ["Privacy Policy", "Terms of Use", "Ethics Charter", "Compliance"],
};

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <footer ref={ref} className="relative bg-[#0A0A0D] text-[#F5F4F0] overflow-hidden">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs>
          <pattern id="footer-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#F5F4F0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-dots)" />
      </svg>

      {/* Top amber rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8922A]/60 to-transparent" />

      {/* Circuit trace decorations */}
      <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.06] pointer-events-none" viewBox="0 0 256 256" fill="none" aria-hidden>
        <path d="M256 128 H180 L160 108 H100 L80 128 H0" stroke="#C8922A" strokeWidth="1" />
        <path d="M256 180 H200 L180 160 H140 L120 180 H0" stroke="#C8922A" strokeWidth="0.5" />
        <circle cx="180" cy="128" r="3" fill="#C8922A" />
        <circle cx="80" cy="128" r="2" fill="#C8922A" />
        <circle cx="200" cy="180" r="2" fill="#C8922A" />
      </svg>

      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-12 pt-20 pb-8 relative z-10">

        {/* Top row: logo + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Reticle className="w-6 h-6 text-[#C8922A]" />
              <span className="font-display text-lg font-bold tracking-[0.25em] uppercase text-[#F5F4F0]">
                Nexus Human
              </span>
            </div>
            <p className="font-mono text-xs text-[#F5F4F0]/40 max-w-xs leading-relaxed">
              Augmenting the human form with precision-engineered systems. Not cold. Not flashy. Just inevitable.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-mono text-[10px] text-[#F5F4F0]/50 uppercase tracking-widest">Systems Operational</span>
            </div>
            <div className="font-mono text-[10px] text-[#F5F4F0]/30 uppercase tracking-widest">
              Registry Open — Cycle 09
            </div>
          </div>
        </motion.div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {Object.entries(footerLinks).map(([category, links], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + ci * 0.08 }}
            >
              <div className="font-mono text-[10px] text-[#C8922A] uppercase tracking-[0.25em] mb-5 font-bold">
                {category}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-mono text-xs text-[#F5F4F0]/45 hover:text-[#F5F4F0] transition-colors duration-150 uppercase tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 mb-12"
        >
          {[
            { label: "Augmentations", value: "1,200+" },
            { label: "Patents", value: "83" },
            { label: "Countries", value: "14" },
            { label: "Est.", value: "2019" },
          ].map((stat) => (
            <div key={stat.label} className="py-6 pr-6 border-r border-white/10 last:border-r-0">
              <div className="font-display text-2xl font-bold text-[#F5F4F0] mb-1">{stat.value}</div>
              <div className="font-mono text-[10px] text-[#F5F4F0]/30 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-white/10 pt-6"
        >
          <div className="font-mono text-[10px] text-[#F5F4F0]/30 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Nexus Human Corporation. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Ethics"].map((l) => (
              <a key={l} href="#" className="font-mono text-[10px] text-[#F5F4F0]/30 hover:text-[#F5F4F0]/70 transition-colors uppercase tracking-widest">
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-[#F5F4F0]/20 uppercase tracking-widest">
            <span className="text-[#C8922A]/60">v</span>2.4.1
            <span className="ml-2 opacity-50">// Protocol Syndicate</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}

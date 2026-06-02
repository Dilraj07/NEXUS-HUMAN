import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Reticle } from "@/components/svgs/Reticle";

const navLinks = [
  { label: "Technology", href: "#technology" },
  { label: "Systems", href: "#systems" },
  { label: "Lab", href: "#lab" },
  { label: "Metrics", href: "#metrics" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Light hero is first section — use dark text until scrolled into dark nav
  const textColor = scrolled ? "text-white/70 hover:text-white" : "text-[#0E0E12]/60 hover:text-[#0E0E12]";
  const logoColor = scrolled ? "text-white" : "text-[#0E0E12]";
  const reticleColor = "text-[#C8922A]";
  const ctaBorder = "border-[#C8922A] text-[#C8922A] hover:bg-[#C8922A]";
  const ctaHoverText = scrolled ? "hover:text-[#0E0E12]" : "hover:text-[#0E0E12]";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0E0E12]/92 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <Reticle className={`w-5 h-5 ${reticleColor} transition-transform duration-500 group-hover:rotate-45`} />
          <span className={`font-display text-sm font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${logoColor}`}>
            Nexus Human
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-[11px] uppercase tracking-widest transition-colors duration-200 ${textColor}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className={`font-mono text-[11px] uppercase tracking-widest px-5 py-2.5 border transition-all duration-150 ${ctaBorder} ${ctaHoverText}`}
        >
          Apply
        </a>
      </div>
    </motion.header>
  );
}

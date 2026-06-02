import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0E0E12]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <Reticle className="w-5 h-5 text-[#C8922A] transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-display text-sm font-bold tracking-[0.25em] uppercase text-white">
            Nexus Human
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 border border-[#C8922A] text-[#C8922A] hover:bg-[#C8922A] hover:text-[#0E0E12] transition-all duration-200"
        >
          Apply
        </a>
      </div>
    </motion.header>
  );
}

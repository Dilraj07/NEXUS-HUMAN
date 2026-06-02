import { motion } from "framer-motion";
import { Reticle } from "@/components/svgs/Reticle";

export function CTASection() {
  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center py-32 overflow-hidden group">
      <div className="absolute inset-0 bg-foreground dark transition-all duration-700 origin-bottom scale-y-0 group-hover:scale-y-100 z-0" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center mix-blend-difference text-background">
        <Reticle className="w-12 h-12 mx-auto mb-12 opacity-50" />
        
        <h2 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] tracking-tighter mb-12">
          Evolve.
        </h2>
        
        <p className="font-mono text-lg max-w-xl mx-auto mb-16 opacity-80">
          The next iteration of humanity is waiting. Join the registry for early access to our neural and structural augmentation programs.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center justify-center px-12 py-5 font-mono text-sm font-bold uppercase tracking-widest text-foreground bg-background hover:bg-accent hover:text-background transition-colors duration-300"
        >
          <span className="absolute inset-0 border border-foreground/20 m-1 pointer-events-none" />
          Join Registry
        </motion.button>
      </div>
      
      <footer className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10 mix-blend-difference text-background font-mono text-xs opacity-50">
        <div>&copy; {new Date().getFullYear()} NEXUS HUMAN</div>
        <div className="hidden md:flex gap-6">
          <a href="#" className="hover:underline">Manifesto</a>
          <a href="#" className="hover:underline">Clinical Data</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <div>SYNDICATE // 09</div>
      </footer>
    </section>
  );
}

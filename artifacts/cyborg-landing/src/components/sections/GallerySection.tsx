import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import labSceneImg from "@/assets/images/lab-scene.png";

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="relative py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase">The Laboratory</h2>
          <p className="font-mono mt-6 text-muted-foreground max-w-2xl mx-auto">Where clinical precision meets industrial design. Our facilities are designed to eliminate distractions and foster absolute focus.</p>
        </motion.div>

        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group border border-border">
          <div className="absolute top-4 left-4 z-10 font-mono text-xs text-background mix-blend-difference uppercase font-bold tracking-widest">Facility // Alpha-04</div>
          <motion.div 
            style={{ y: yParallax }}
            className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)]"
          >
            <img 
              src={labSceneImg} 
              alt="Nexus Human Laboratory" 
              className="w-full h-full object-cover filter grayscale-[20%] contrast-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-700 ease-in-out pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

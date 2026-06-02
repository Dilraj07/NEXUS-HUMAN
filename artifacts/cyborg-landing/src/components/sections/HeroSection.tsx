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

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImageLayer1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-background text-foreground flex items-center justify-center pt-20"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: yImageLayer1, scale: scaleImage, opacity }}
          className="relative w-full max-w-5xl aspect-video mx-auto px-8"
        >
          <img
            src={heroArmImg}
            alt="Nexus Human Augmentation Arm"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col justify-center h-full pb-20">
        <motion.div
          style={{ y: yText, opacity }}
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Reticle className="w-8 h-8 text-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground font-bold">
              Protocol // 001
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-8 text-foreground uppercase">
            Where flesh ends,<br />
            <span className="text-muted-foreground/40 italic font-serif lowercase tracking-normal">design begins.</span>
          </h1>
          <p className="font-mono text-base md:text-lg max-w-xl text-muted-foreground leading-relaxed">
            NEXUS HUMAN // Augmenting the human form with precision-engineered systems. Not cold, not flashy. Just inevitable.
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-12 right-12 flex justify-between items-end"
      >
        <div className="font-mono text-xs text-muted-foreground">SCROLL TO INITIALIZE</div>
        <div className="w-[1px] h-16 bg-foreground/20 overflow-hidden">
          <motion.div 
            className="w-full h-full bg-accent origin-top"
            animate={{ scaleY: [0, 1, 0], translateY: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

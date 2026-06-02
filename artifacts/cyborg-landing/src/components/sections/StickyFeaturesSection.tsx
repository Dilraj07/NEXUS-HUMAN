import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import spineImg from "@/assets/images/spine-render.png";
import chipImg from "@/assets/images/neural-chip.png";

const features = [
  {
    id: "01",
    title: "Structural Integrity",
    desc: "Exoskeletal spine segments constructed from interwoven carbon fiber and medical-grade titanium. Infinite flexibility, zero fatigue.",
    image: spineImg,
  },
  {
    id: "02",
    title: "Neural Synchronization",
    desc: "Micro-scale neural interface chips bridging the gap between intention and action. The latency is practically non-existent.",
    image: chipImg,
  },
];

export function StickyFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate when we transition from feature 1 to feature 2
  // We have a 200vh container, so the transition happens around 0.5
  const opacity1 = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-foreground text-background dark">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="container mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Text Content */}
            <div className="relative h-[400px] flex flex-col justify-center">
              {/* Feature 1 */}
              <motion.div 
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-accent text-xl mb-4 font-bold tracking-widest">{features[0].id}</div>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">{features[0].title}</h3>
                <p className="font-mono text-muted-foreground leading-relaxed max-w-md">
                  {features[0].desc}
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-mono text-accent text-xl mb-4 font-bold tracking-widest">{features[1].id}</div>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">{features[1].title}</h3>
                <p className="font-mono text-muted-foreground leading-relaxed max-w-md">
                  {features[1].desc}
                </p>
              </motion.div>
            </div>

            {/* Visual Content */}
            <div className="relative h-[500px] lg:h-[600px] w-full">
              {/* Image 1 */}
              <motion.div 
                style={{ opacity: opacity1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full p-8 border border-border/20 bg-background/5">
                  <img src={features[0].image} alt={features[0].title} className="w-full h-full object-contain mix-blend-screen invert" />
                  
                  {/* Decorative corner markers */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-muted-foreground/50" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-muted-foreground/50" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-muted-foreground/50" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-muted-foreground/50" />
                </div>
              </motion.div>

              {/* Image 2 */}
              <motion.div 
                style={{ opacity: opacity2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full p-8 border border-border/20 bg-background/5">
                  <img src={features[1].image} alt={features[1].title} className="w-full h-full object-contain mix-blend-screen invert" />
                  
                  {/* Decorative corner markers */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

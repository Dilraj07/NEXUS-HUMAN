import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reticle } from "@/components/svgs/Reticle";
import eyeBlueprintImg from "@/assets/images/eye-blueprint.png";

export function TechSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section ref={containerRef} className="relative py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-square w-full"
            >
              <div className="absolute inset-0 bg-muted/20" />
              <img
                src={eyeBlueprintImg}
                alt="Eye Blueprint"
                className="w-full h-full object-cover mix-blend-multiply"
              />
              <Reticle className="absolute top-4 left-4 text-accent w-6 h-6" />
              <Reticle className="absolute bottom-4 right-4 text-accent w-6 h-6 rotate-180" />
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-border mb-8">
                <div className="w-2 h-2 bg-accent" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">Ocular Augmentation</span>
              </div>
              <h3 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.9] mb-8">
                Perception<br/>
                <span className="text-muted-foreground">Redefined.</span>
              </h3>
              <p className="font-mono text-muted-foreground leading-relaxed mb-8 max-w-md">
                The layered lens augmentation intercepts photons before they hit the retina, filtering, magnifying, and analyzing data streams in real-time. Rendered in a sub-millimeter titanium casing.
              </p>
              
              <ul className="space-y-4 font-mono text-sm border-t border-border pt-8">
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground">Spectrum Range</span>
                  <span className="font-bold text-foreground">300nm - 1100nm</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground">Latency</span>
                  <span className="font-bold text-foreground">&lt; 0.2ms</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-muted-foreground">Material</span>
                  <span className="font-bold text-foreground">Sapphire Glass / Ti-6Al-4V</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

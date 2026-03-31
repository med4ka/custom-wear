"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight, Sparkles, Fingerprint, Scissors } from "lucide-react";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity1 = useTransform(scrollY, [0, 500], [0.4, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-neutral-900 overflow-hidden font-sans">
      
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAFAFA] to-[#F3F4F6]" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-200/50 text-sm font-semibold tracking-widest uppercase text-neutral-600">
            <Sparkles size={16} />
            <span>Premium Essentials</span>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-neutral-900 leading-[1.1]">
              Simplicity is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500">
                The Ultimate.
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-lg md:text-xl text-neutral-500 max-w-2xl font-medium mx-auto">
              We stripped away the noise. No massive logos, no chaotic patterns. Just premium materials, perfect cuts, and timeless colors tailored for your everyday life.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-neutral-400"
        >
          <span className="text-xs uppercase font-semibold tracking-widest">Scroll Down</span>
          <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-8 bg-neutral-300 rounded-full"
          />
        </motion.div>

        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute top-1/2 -translate-y-1/2 -right-32 md:-right-10 w-[500px] md:w-[700px] h-[500px] md:h-[700px] z-0 pointer-events-none"
        >
          <motion.div
             animate={{ y: [0, -20, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="relative w-full h-full"
          >
              <Image
                src="/wearable/baju1.png"
                alt="Floating T-Shirt"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-white relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
        >
          <motion.div variants={slideInLeft} className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 shadow-inner p-10 flex items-center justify-center">
             <Image
              src="/wearable/baju3.png"
              alt="Premium Quality"
              fill
              className="object-contain p-12 drop-shadow-xl hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div variants={slideInRight}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-neutral-900">
                The Origin Story
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed mb-6">
                It all started with a simple observation: the fashion industry was saturated with excess and noise, often prioritizing massive branding over quality and comfort. We decided to return to the essentials of style.
              </p>
              <p className="text-lg text-neutral-500 leading-relaxed">
                CustomWear was born not to dictate your style, but to provide high-quality, blank essentials. Let the fit and the fabric speak for themselves.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col gap-3">
                <Fingerprint size={32} className="text-neutral-900" />
                <h4 className="font-bold text-xl text-neutral-900">Logo-Free</h4>
                <p className="text-neutral-500 text-sm">Clean aesthetics that blend seamlessly into any wardrobe.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Scissors size={32} className="text-neutral-900" />
                <h4 className="font-bold text-xl text-neutral-900">Tailored Fit</h4>
                <p className="text-neutral-500 text-sm">Engineered silhouettes that complement your natural posture.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-[#FAFAFA] relative z-10 border-t border-neutral-100">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           variants={staggerContainer}
           className="max-w-6xl mx-auto text-center"
        >
            <motion.h3 variants={fadeInUp} className="text-4xl font-bold mb-4 text-neutral-900">The Essentials Collection</motion.h3>
            <motion.p variants={fadeInUp} className="text-neutral-500 mb-16 max-w-xl mx-auto">Discover our core line of premium basics. Available in multiple timeless colors inside our studio.</motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group hover:-translate-y-2">
                   <div className="relative w-full aspect-square mb-6 bg-neutral-50 rounded-2xl overflow-hidden">
                      <Image src="/wearable/baju1.png" alt="Premium T-Shirt" fill className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <h4 className="font-bold text-xl text-neutral-900">Premium T-Shirt</h4>
                   <p className="text-neutral-500 text-sm mb-4">100% Supima Cotton</p>
                   <span className="font-semibold text-lg">$25</span>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group hover:-translate-y-2">
                   <div className="relative w-full aspect-square mb-6 bg-neutral-50 rounded-2xl overflow-hidden">
                      <Image src="/wearable/baju2.png" alt="Classic Polo" fill className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <h4 className="font-bold text-xl text-neutral-900">Classic Polo</h4>
                   <p className="text-neutral-500 text-sm mb-4">Breathable Pique Knit</p>
                   <span className="font-semibold text-lg">$40</span>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group hover:-translate-y-2">
                   <div className="relative w-full aspect-square mb-6 bg-neutral-50 rounded-2xl overflow-hidden">
                      <Image src="/wearable/baju3.png" alt="Everyday Button-Up" fill className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <h4 className="font-bold text-xl text-neutral-900">Everyday Button-Up</h4>
                   <p className="text-neutral-500 text-sm mb-4">Wrinkle-Resistant Oxford</p>
                   <span className="font-semibold text-lg">$55</span>
                </motion.div>
            </div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-neutral-900 text-white text-center relative z-10 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto flex flex-col items-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
            Find your <br /> perfect color
          </h2>
          <Link 
            href="/customize"
            className="bg-white text-neutral-900 px-12 py-6 rounded-full font-bold text-xl flex items-center gap-3 hover:bg-neutral-200 transition-all hover:gap-5 hover:scale-105 shadow-2xl"
          >
            Enter Color Studio <MoveRight size={24} />
          </Link>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" />
      </section>

    </main>
  );
}
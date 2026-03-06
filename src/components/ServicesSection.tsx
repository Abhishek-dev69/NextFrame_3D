"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const services = [
  {
    title: "3D Metaframe Generation",
    description: "Turning raw structural blueprints into habitable digital twins for large-scale building projects.",
  },
  {
    title: "Metaglass AR Visualization",
    description: "Proprietary hardware integration allowing buyers to see finished interiors while standing in a construction shell.",
  },
  {
    title: "Real-Time Photometric Staging",
    description: "Dynamic material swapping and lighting simulation for luxury real estate pre-sales.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 20 },
  visible: { 
    opacity: 1, 
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    y: 0,
    transition: { 
      type: "spring", stiffness: 60, damping: 20, duration: 0.8
    } 
  },
};

export const ServicesSection = () => {
  return (
    <section className="relative py-32 bg-black px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-white tracking-tight"
          >
            The <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">Metaframe</span> Advantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-gray-400 font-light max-w-2xl mx-auto"
          >
            Pioneering the intersection of architectural intent and spatial reality.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:border-white/20 transition-colors duration-500">
                <div>
                  <div className="text-gray-500 text-sm font-mono tracking-widest mb-6">0{index + 1}</div>
                  <h3 className="text-2xl font-light text-white mb-4 leading-tight">{service.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-12">
                  <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section className="relative py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Industrial Info */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Industrial Buildings <br/>
            <span className="text-gray-500">&amp;</span> Flats
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-md leading-relaxed">
            Experience our comprehensive 3D metaframe solutions specifically designed for
            cutting-edge industrial complexes, commercial high-rises, and premium residential flats.
            Visualize every structural detail before a single brick is laid.
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-gray-500 to-transparent"></div>
        </motion.div>

        {/* Right Side: Contact Form (Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-black/40 backdrop-blur-2xl px-8 py-12 md:p-12 rounded-3xl outline outline-1 outline-white/5 shadow-2xl">
              <h3 className="text-2xl font-light text-white mb-8 tracking-wide">
                Consult with <span className="font-medium">Shrey Bhanusali</span>
              </h3>
              
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <p className="text-xl text-green-400 font-light mb-2">Message Received.</p>
                  <p className="text-gray-400 text-sm">Shrey will reach out shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                      placeholder="jane@architecture.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">Project Details</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light resize-none"
                      placeholder="Tell us about your upcoming development..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full mt-4 bg-white text-black hover:bg-gray-200 font-medium py-3 rounded-xl transition-colors duration-300 disabled:opacity-70 flex justify-center"
                  >
                    {status === "submitting" ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      "Request Consultation"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingInput = ({ 
  id, label, type, value, onChange, placeholder, isTextArea = false
}: { 
  id: string, label: string, type: string, value: string, onChange: any, placeholder: string, isTextArea?: boolean
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  
  const baseClassName = "w-full bg-[#050505] border border-white/10 rounded-xl px-4 text-white placeholder-gray-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-light text-sm shadow-inner";
  
  return (
    <div className="relative group">
      <label 
        htmlFor={id} 
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono tracking-widest uppercase z-10
          ${active ? "-top-2.5 text-[9px] text-blue-400 bg-[#050505] px-1" : "top-3.5 text-xs text-gray-500"}
        `}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id} name={id} required value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          rows={4}
          className={`${baseClassName} py-4 resize-none`}
        />
      ) : (
        <input
          id={id} name={id} type={type} required value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          className={`${baseClassName} py-3.5`}
        />
      )}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-md" />
    </div>
  );
};

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500); // Simulate network latency
  };

  return (
    <section className="relative py-16 md:py-32 bg-black px-6 overflow-hidden z-10">
      {/* Ambient glowing atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* ── Left Side: Typography & Info ── */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
                Contact Us
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.2] pb-2 pr-4">
              Ready to <br/>
              <span className="font-semibold italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Start?
              </span>
            </h2>
          </div>
          
          <p className="text-gray-400 font-light max-w-md leading-relaxed text-[15px]">
            Whether you are developing a commercial high-rise or a premium residential complex, NextFramee brings your architecture to life before construction even begins. Connect with our team today.
          </p>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-500 mb-2">Location</p>
              <p className="text-white text-[15px] font-light">Nashik, Mumbai, Vapi & Ahmedabad</p>
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-500 mb-2">Direct Contact</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+917698800778" className="group flex items-center gap-3 w-fit transition-all">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <svg className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-white text-[15px] font-light group-hover:text-gray-200">+91 76988 00778</span>
                </a>
              </div>
              <a href="mailto:team.nextframee@gmail.com" className="text-blue-400 font-light hover:text-blue-300 transition-colors mt-3 block flex items-center gap-2">
                <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                team.nextframee@gmail.com
              </a>
            </div>
            <div className="sm:col-span-2 pt-2">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-500 mb-3">Social</p>
              <a 
                href="https://www.instagram.com/nextframee.tech?igsh=d2dsbWQ1MzZld2lu" 
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 pointer-events-none" />
                <svg className="w-5 h-5 text-gray-300 group-hover:text-pink-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="text-sm font-light text-white tracking-wide">@nextframee.tech</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Right Side: Glass Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative p-[1px] rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
            
            <div className="bg-[#050505]/80 backdrop-blur-2xl px-6 py-10 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-2xl font-light text-white mb-2 tracking-wide">
                Send a <span className="font-medium">Message</span>
              </h3>
              <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-8">
                Response within 24 hours
              </p>
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    >
                      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <p className="text-2xl text-white font-light mb-2">Message Sent</p>
                    <p className="text-gray-400 text-sm font-light">Shrey or Dhaval will reach out to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <FloatingInput 
                      id="name" 
                      label="Full Name" 
                      type="text" 
                      placeholder="e.g. Jane Doe" 
                      value={form.name} 
                      onChange={handleChange} 
                    />
                    <FloatingInput 
                      id="email" 
                      label="Work Email" 
                      type="email" 
                      placeholder="jane@architecture.com" 
                      value={form.email} 
                      onChange={handleChange} 
                    />
                    <FloatingInput 
                      id="message" 
                      label="Project Details" 
                      type="text" 
                      placeholder="Tell us about your upcoming development..." 
                      value={form.message} 
                      onChange={handleChange} 
                      isTextArea
                    />
                    
                    <button
                      type="submit"
                      disabled={status === "submitting" || !form.name || !form.email || !form.message}
                      className="group relative w-full flex justify-center py-4 px-4 mt-8 border border-transparent text-sm font-semibold rounded-xl text-black bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      
                      <span className="relative flex items-center gap-2 tracking-wide uppercase">
                        {status === "submitting" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message →"
                        )}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

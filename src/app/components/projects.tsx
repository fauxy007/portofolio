"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight, Database, Music, Newspaper, ShoppingCart } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// SHARED ANIMATION CONFIG
// ═══════════════════════════════════════════════════════════════
const SOFT_LANDING: [number, number, number, number] = [0.33, 1, 0.68, 1];

// ═══════════════════════════════════════════════════════════════
// PROJECT DATA
// ═══════════════════════════════════════════════════════════════
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════
// PROJECT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the image area
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yParallax = useTransform(smoothProgress, [0, 1], [-50, 50]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: SOFT_LANDING, delay: index * 0.1 }}
      className="relative w-full mb-32 md:mb-48 group will-change-transform"
    >
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Visual Representation */}
        <div className="w-full lg:w-3/5 relative aspect-video rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm group-hover:shadow-xl transition-all duration-700">
          {/* Image from DB */}
          {project.imageUrl && (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", 
              backgroundSize: "32px 32px" 
            }} 
          />

          {/* Parallax Content Container (Optional decorative element) */}
          <motion.div 
            style={{ y: yParallax }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none border-t border-white/20 will-change-transform"
          >
            {/* Tech stack floating tags */}
            <div className="relative w-full h-full">
              {project.techStack.slice(0, 2).map((t, i) => (
                <div 
                  key={t}
                  className={`absolute ${i === 0 ? 'top-10 right-10' : 'bottom-10 left-10'} px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/50`}
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Overlay Link Indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <ArrowUpRight className="text-zinc-900 w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl md:text-5xl font-[family-name:var(--font-anton)] text-zinc-200 group-hover:text-red-600 transition-colors duration-500">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <div className="h-[1px] flex-grow bg-zinc-100" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Selected Project
            </span>
          </div>

          <h3 className="text-5xl md:text-6xl tracking-tight uppercase font-[family-name:var(--font-anton)] text-zinc-900">
            {project.title}
          </h3>

          <p className="text-lg text-zinc-500 leading-relaxed font-[family-name:var(--font-geist-sans)] max-w-lg">
            {project.description}
          </p>

          {/* Tech Stack Horizontal List */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((t) => (
              <span 
                key={t}
                className="px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-6 flex gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-sm font-bold text-white transition-all hover:pr-12 active:scale-95"
              >
                <span className="relative z-10 uppercase tracking-widest">Live Demo</span>
                <ArrowUpRight className="absolute right-4 w-5 h-5 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 z-10" />
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </a>
            )}
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white border border-zinc-200 px-8 py-4 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-50 active:scale-95"
              >
                <span className="relative z-10 uppercase tracking-widest">Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════
export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section 
      id="projects" 
      className="relative w-full bg-white py-20 text-zinc-900 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zinc-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none transform-gpu" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro Section */}
        <div className="mb-32 md:mb-48">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: SOFT_LANDING }}
            className="flex flex-col gap-4"
          >
            <span className="text-red-600 text-[12px] font-bold uppercase tracking-[0.4em]">
              Selected Works
            </span>
            <h2 className="text-[15vw] md:text-[10vw] font-[family-name:var(--font-anton)] leading-[0.8] tracking-tighter uppercase text-zinc-900">
              Projects<span className="text-zinc-200">.</span>
            </h2>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 gap-8">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: SOFT_LANDING }}
                className="max-w-xl"
             >
                <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed">
                  Building digital solutions with focus on performance, scalability, and seamless user interaction.
                </p>
             </motion.div>
             
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: SOFT_LANDING }}
                className="flex items-center gap-4 text-zinc-300"
             >
                <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center animate-bounce">
                   <ArrowUpRight className="rotate-90 w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to explore</span>
             </motion.div>
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 text-zinc-400 font-medium italic">
            No projects found in the database.
          </div>
        )}

        {/* Footer Link (Optional) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-0"
        >
          <p className="text-zinc-300 font-mono text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Fadzar Surya Wijaya — All Rights Reserved
          </p>
        </motion.div>
      </div>
    </section>
  );
}

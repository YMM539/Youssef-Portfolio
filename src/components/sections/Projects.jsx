'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // تأكد من المسار الصحيح لملف Supabase
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // 1. جلب البيانات من Supabase
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (error) console.error('Error fetching projects:', error);
      else setProjects(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // 2. أنيميشن GSAP (التكديس والعنوان)
  useLayoutEffect(() => {
    if (!loading && projects.length > 0) {
      const ctx = gsap.context(() => {

        // --- أنيميشن ظهور العنوان عند التحميل ---
        gsap.fromTo(".projects-title-line",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.2 }
        );
        // ----------------------------------------
        
        // --- أنيميشن التكديس (Stacked Cards) ---
        const cards = gsap.utils.toArray(".project-card");

        cards.forEach((card, index) => {
          // نطبق التأثير على كل البطاقات ما عدا الأخيرة
          if (index < cards.length - 1) {
            gsap.to(card, {
              scale: 0.9,       // تصغير الكارت الخلفي
              opacity: 0.5,     // تقليل شفافيته
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top top", 
                end: "bottom top", 
                scrub: true,
                pin: true,        // تثبيت الكارت ليصعد التالي فوقه
                pinSpacing: false // مهم جداً للتكديس
              }
            });
          }
        });

      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading, projects]);

  if (loading) return <div className="h-screen bg-black"></div>;

  return (
    <section ref={containerRef} id="projects" className=" text-white pb-32">
      
      {/* --- العنوان المتحرك --- */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 border-b border-zinc-800 pb-8 overflow-hidden">
          
          <span className="block overflow-hidden">
            <span className="projects-title-line inline-block">Selected</span>
            <span className="projects-title-line inline-block ml-4">Works</span>
          </span>
          
          
        </h2>
      </div>

      {/* --- قائمة البطاقات المكدسة --- */}
      <div className="flex flex-col items-center w-full">
        {projects.map((project, index) => (
          
          <div 
            key={project.id} 
            // الكارد: تثبيت في الأعلى، خلفية سوداء، ويكون بحجم الشاشة
            className="project-card w-full min-h-screen flex items-center justify-center sticky top-0 bg-black border-t border-zinc-800"
          >
            <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center gap-10 md:gap-20 py-10">
              
              {/* 1. التفاصيل (يسار) */}
              <div className="w-full md:w-1/2 space-y-8 z-10 order-2 md:order-1">
                <div className="flex items-center gap-4">
                   <span className="text-xs font-mono border border-white/20 px-3 py-1 rounded-full">0{index + 1}</span>
                   <div className="h-px w-20 bg-zinc-800"></div>
                </div>
                
                <h3 className="text-4xl md:text-7xl font-bold leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                  {project.description}
                </p>

                {/* التاغز */}
                <div className="flex flex-wrap gap-3">
                  {typeof project.tags === 'string' 
                    ? project.tags.split(',').map((t, i) => (
                        <span 
                          key={i} 
                          className="text-xs font-mono uppercase tracking-widest text-white border border-white/40 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                        >
                          {t.trim()}
                        </span>
                      ))
                    : project.tags?.map((t, i) => (
                        <span 
                          key={i} 
                          className="text-xs font-mono uppercase tracking-widest text-white border border-white/40 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                        >
                          {t.trim()}
                        </span>
                      ))
                  }
                </div>

                {/* الأزرار */}
                <div className="flex gap-6 pt-4">
                  {project.demo_link && (
                    <a href={project.demo_link} target="_blank" className="group flex items-center gap-2 text-white border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-all">
                      Live Demo <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                  {project.repo_link && (
                    <a href={project.repo_link} target="_blank" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                      <Github size={20} /> Code
                    </a>
                  )}
                </div>
              </div>

              {/* 2. الصورة (يمين) - تم تعديلها لـ object-contain */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative order-1 md:order-2 group overflow-hidden rounded-lg bg-zinc-900">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  // *** التعديل هنا: استخدام object-contain لضمان ظهور الصورة كاملة ***
                  className="object-contain transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                {/* تأثير ظل خفيف */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>

            </div>
          </div>

        ))}
      </div>
    </section>
  );
}

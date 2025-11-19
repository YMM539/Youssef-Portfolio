'use client'; 

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../ui/Container.jsx';
import { cn } from '../../lib/utils.js'; // 1. استدعاء CN (قد نحتاجه)

// 2. استدعاء المكون الجديد (تأكد من المسار واسم الملف الذي تم إنشاؤه)
import { LightRays } from '../ui/light-rays.jsx'; 

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useLayoutEffect(() => {
    // ... (كود الأنيميشن الخاص بـ GSAP كما هو) ...
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 50 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      // 3. تأكد أن 'relative' و 'overflow-hidden' موجودان هنا
      className="relative overflow-hidden min-h-[calc(100vh-4rem)] py-16 md:py-24 bg-[var(--background)] text-[var(--foreground)] border-2 border-[var(--foreground)] rounded-xl shadow-lg mx-auto max-w-6xl"
    >
      
      {/* 4. إضافة أشعة الضوء كخلفية (z-0) */}
      <LightRays className="absolute inset-0 z-0" />

      {/* 5. إضافة 'relative z-10' للحاوية لتطفو فوق الأشعة */}
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-extrabold tracking-tight opacity-0">About Me</h2>
          
          <div
            ref={descRef}
            className="mt-8 text-lg sm:text-xl leading-relaxed text-[var(--foreground)] opacity-0 p-6 md:p-8 rounded-xl shadow-lg max-w-3xl mx-auto space-y-6"
          >
            {/* ... باقي كود الوصف والنصوص ... */}
             <p>
              As a Front-End Developer, I am dedicated to crafting fast, clean, and high-quality user experiences. My programming journey began through self-directed learning, culminating in solid expertise in HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS.
            </p>
            <p>
              I specialize in delivering professional interfaces and translating UI/UX designs into reusable components, with a consistent emphasis on performance, accessibility, and responsive design.
            </p>
            <p>
              My portfolio includes real-world projects such as corporate websites, vehicle showcase platforms, and game interface systems. In these engagements, I implemented API integrations, advanced filtering, motion animations, and SEO enhancements.
            </p>
            <p>
              I remain committed to continuous learning and skill refinement. My objective is to contribute as a Front-End Developer within an environment that empowers me to deliver practical, scalable solutions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
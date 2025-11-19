'use client'; // 1. مكون عميل لاستخدام الـ Hooks

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Github, Linkedin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic'; // 1. استيراد dynamic

// 2. استدعاء PixelImage بشكل ديناميكي (لحل مشكلة Hydration)
const PixelImage = dynamic(
  () => import('../ui/pixel-image.jsx').then((mod) => mod.PixelImage),
  { ssr: false }
);

// 1. هذا لاستيراد الحاوية (صحيح)
import Container from '../ui/Container.jsx'; 

export default function Hero() {
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const socialRef = useRef(null);
  const badgeRef = useRef(null); // Added missing ref

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.set([titleRef.current, descRef.current, buttonsRef.current, imageContainerRef.current, socialRef.current], { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      tl.to(titleRef.current, { opacity: 1, y: 0, delay: 0.2 })
        .to(descRef.current, { opacity: 1, y: 0 }, "-=0.6")
        .to(buttonsRef.current, { opacity: 1, y: 0 }, "-=0.6")
        .to(imageContainerRef.current, { opacity: 1, y: 0 }, "-=0.6")
        .to(socialRef.current, { opacity: 1, y: 0 }, "-=0.6");
      
    }, heroRef);

    return () => ctx.revert();
  }, []); // [] تعني أن هذا الكود سيعمل مرة واحدة فقط عند تحميل المكون

  return (
    <Container>

      
      <section 
        id="hero"
        className="min-h-[calc(100vh-4rem)] py-16 md:py-10"
        ref={heroRef} // 5. ربط المرجع الرئيسي بالقسم
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:justify-items-stretch gap-10">
          
          {/* Left column */}
          <div className="order-1 md:order-1 text-center md:text-left space-y-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)]" ref={titleRef}>
              Hi, I&#39;m Youssef Mohamed
              <br />
              <span className="mt-2 inline-block text-sm font-semibold uppercase tracking-wide rounded-full bg-[var(--foreground)] text-[var(--background)] px-4 py-1.5 shadow-sm" ref={badgeRef}>
                Front-End Developer
              </span>
            </h1>
            
            <p className="text-base sm:text-lg leading-relaxed text-[var(--foreground)] opacity-75 max-w-xl" ref={descRef}>
              I build fast, responsive, and beautiful web applications.
              Passionate about modern web technologies and creating amazing user experiences.
            </p>

            <div className="mt-2 flex flex-col sm:flex-row items-center sm:items-start gap-4" ref={buttonsRef}>
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 rounded-full border-2 border-[var(--foreground)] px-7 py-3.5 text-sm sm:text-base font-semibold text-[var(--foreground)] shadow-sm hover:text-[var(--background)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Contact Me
              </Link>
              <a
                href="/pdf/cv.pdf"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 rounded-full border-2 border-[var(--foreground)] px-7 py-3.5 text-sm sm:text-base font-semibold text-[var(--foreground)] shadow-sm hover:text-[var(--background)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Download CV
                <Download size={20} />
              </a>
            </div>
          </div>

          {/* --- العمود الأيمن: الصورة Pixel Image وأيقونات التواصل --- */}
          <div className="order-2 md:order-2 flex flex-col items-center md:items-end gap-8" ref={imageContainerRef}>
            
            {/* 1. صورة Pixel Image */}
            {/* تأكد أن حاوية الصورة لها حجم محدد لكي يعمل الأنيميشن */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
               <PixelImage 
                 src="/img/YMM.png" 
                 pixelSize={8} // حجم البكسل (كلما صغر الرقم زادت الدقة)
                 gap={2}       // المسافة بين البكسلات
                 className="w-full h-full object-cover"
               />
            </div>

            {/* 2. أيقونات التواصل الاجتماعي (تحت الصورة) */}
            <div ref={socialRef} className="flex items-center gap-6 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
              
              <a 
                href="https://github.com/YMM539" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:scale-125 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={28} />
              </a>

              <a 
                href="https://www.linkedin.com/in/%D9%8A%D9%88%D8%B3%D9%81-%D9%85%D8%AD%D9%85%D8%AF-%D9%85%D8%AD%D9%85%D9%88%D8%AF-%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D9%81%D8%AA%D8%A7%D8%AD-2ba01b373/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:scale-125 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>

              <a 
                href="mailto:youssefy.f123456@gmail.com"
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:scale-125 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={28} />
              </a>

            </div>

          </div>
          
        </div>
      </section>
    </Container>
  );
}
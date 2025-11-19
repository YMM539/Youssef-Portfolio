'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Twitter, Instagram, Facebook, MessageSquare, Send } from 'lucide-react'; 

// ***** استيراد MagicCard من مسار shadcn/ui المتوقع *****
import { MagicCard } from '../ui/magic-card'; 
// ******************************************************

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null); // Ref لإدارة MagicCard

  // أنيميشن GSAP: الحركة من اليمين
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(sectionRef.current, 
        { 
          x: '100%', // يبدأ من خارج الشاشة من اليمين
          opacity: 0 
        },
        {
          x: '0%',   // ينتهي في مكانه الأصلي
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", 
            end: "top center",   
            scrub: 1,
            // markers: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="bg-black text-white py-32 overflow-hidden">
       
      
      <div 
        ref={sectionRef} 
        className="container px-5 mx-auto flex justify-center"
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        
        {/* MagicCard يلتف حول نموذج الاتصال بالكامل */}
        <MagicCard
            ref={cardRef}
            className="w-full max-w-3xl cursor-pointer p-8 shadow-2xl transition-all duration-300 border border-zinc-700"
            borderShowDuration={300}
            // خلفية MagicCard أبيض وأسود
            background="radial-gradient(var(--bg-size) at 50% 50%, #171717 0%, #000000 100%)"
        >
            <div className="flex flex-col text-center w-full mb-8">
              <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-white">
                Let&#39;s Talk Business
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-zinc-400">
                I&#39;m currently accepting new projects. Let me know how I can help you build your vision.
              </p>
            </div>
            
            <form action="https://formspree.io/f/mkgybqro" 
    method="POST" 
            className="lg:w-full md:w-full mx-auto">
              <div className="flex flex-wrap -m-2">
                
                {/* حقل الاسم */}
                <div className="p-2 w-1/2">
                  <div className="relative">
        <label htmlFor="name" className="leading-7 text-sm text-zinc-400">Name</label>
        <input 
          type="text" 
          id="name" 
          name="Name" // 👈🏻 name
          required 
          className="w-full bg-zinc-800 bg-opacity-50 rounded border border-zinc-700 focus:border-white focus:bg-zinc-800 focus:ring-2 focus:ring-zinc-700 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
    
    {/* 2. حقل الإيميل */}
    <div className="p-2 w-1/2">
      <div className="relative">
        <label htmlFor="email" className="leading-7 text-sm text-zinc-400">Email</label>
        <input 
          type="email" 
          id="email" 
          name="Email" // 👈🏻 name
          required 
          className="w-full bg-zinc-800 bg-opacity-50 rounded border border-zinc-700 focus:border-white focus:bg-zinc-800 focus:ring-2 focus:ring-zinc-700 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
    
    {/* 3. حقل الرسالة */}
    <div className="p-2 w-full">
      <div className="relative">
        <label htmlFor="message" className="leading-7 text-sm text-zinc-400">Message</label>
        <textarea 
          id="message" 
          name="Message" // 👈🏻 name
          required 
          className="w-full bg-zinc-800 bg-opacity-50 rounded border border-zinc-700 focus:border-white focus:bg-zinc-800 focus:ring-2 focus:ring-zinc-700 h-32 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
    </div>
    
    {/* 4. زر الإرسال */}
    <div className="p-2 w-full">
      <button 
        type="submit" // 👈🏻 نوع الزر
        className="flex mx-auto text-black bg-white border-0 py-2 px-8 focus:outline-none hover:bg-zinc-200 rounded text-lg transition-colors duration-300 items-center gap-2"
      >
        <Send size={20} /> Send Message
      </button>
    </div>
                
                {/* معلومات الاتصال والروابط الاجتماعية */}
                <div className="p-2 w-full pt-8 mt-8 border-t border-zinc-700 text-center">
                  <a href="mailto:yusuf.dev@example.com" className="text-white hover:text-zinc-400 transition-colors flex items-center justify-center gap-2">
                    <Mail size={20} /> youssefy.f123456@gmail.com
                  </a>
                  <p className="leading-normal my-5 text-zinc-400">Cairo, Egypt
                    <br />Available Worldwide
                  </p>
                </div>
              </div>
            </form>
        </MagicCard>
        
      </div>
    </section>
  );
}
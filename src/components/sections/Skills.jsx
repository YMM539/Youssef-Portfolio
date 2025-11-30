'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Container from '../ui/Container.jsx';
import Marquee from '../ui/marquee.jsx';
import { Terminal, TypingAnimation, AnimatedSpan } from '../ui/terminal.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// الأيقونات
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiBootstrap, SiSass, SiRedux, SiGit, SiGithub, SiFigma 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

gsap.registerPlugin(ScrollTrigger);

// الصف الأول من الأيقونات
const row1 = [
  { icon: <SiHtml5 size={40} className="text-orange-500" /> },
  { icon: <SiCss3 size={40} className="text-blue-500" /> },
  { icon: <SiJavascript size={40} className="text-yellow-400" /> },
  { icon: <SiTypescript size={40} className="text-blue-400" /> },
  { icon: <SiReact size={40} className="text-cyan-400" /> },
  { icon: <SiNextdotjs size={40} className="text-black dark:text-white" /> }, // تعديل لون Next.js ليظهر في الوضعين
];

// الصف الثاني من الأيقونات
const row2 = [
  { icon: <SiTailwindcss size={40} className="text-cyan-300" /> },
  { icon: <SiBootstrap size={40} className="text-purple-500" /> },
  { icon: <SiRedux size={40} className="text-purple-600" /> },
  { icon: <SiSass size={40} className="text-pink-500" /> },
  { icon: <SiGit size={40} className="text-red-500" /> },
  { icon: <SiFigma size={40} className="text-purple-400" /> },
  { icon: <VscVscode size={40} className="text-blue-500" /> },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      
      // أنيميشن للقسم الداخلي (يكبر ويظهر)
      gsap.from(".themed-box", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      });

      // أنيميشن المحتوى (يسار ويمين)
      gsap.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: { trigger: el, start: "top 80%" }
      });

      gsap.from(rightColRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: { trigger: el, start: "top 80%" }
      });

    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 w-full overflow-hidden">
      <Container>
        
        {/* الصندوق الرئيسي (المتجاوب مع الثيم) 
          - في الوضع الفاتح: خلفية بيضاء وحدود رمادية فاتحة
          - في الوضع الداكن: خلفية سوداء وحدود رمادية غامقة
        */}
        <div className="themed-box relative rounded-3xl bg-white dark:bg-black shadow-2xl overflow-hidden p-8 md:p-16 transition-colors duration-300">
          
          {/* عنوان القسم (يتغير لونه حسب الثيم) */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 tracking-tight transition-colors duration-300">
            Technologies & Skills
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* --- اليسار: شريط الأيقونات المتحرك (Marquee) --- */}
            <div ref={leftColRef} className="flex flex-col gap-8 relative">
              
              {/* تدرج لوني (Gradient) لإخفاء الحواف 
                 - يتغير لونه من الأبيض في الوضع الفاتح إلى الأسود في الوضع الداكن
              */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-black to-transparent z-10 transition-colors duration-300"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-black to-transparent z-10 transition-colors duration-300"></div>

              {/* الصف الأول */}
              <Marquee pauseOnHover className="[--duration:20s]">
                {row1.map((item, i) => (
                  <div key={i} className="mx-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                    {item.icon}
                  </div>
                ))}
              </Marquee>

              {/* الصف الثاني */}
              <Marquee reverse pauseOnHover className="[--duration:20s]">
                {row2.map((item, i) => (
                  <div key={i} className="mx-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                    {item.icon}
                  </div>
                ))}
              </Marquee>
            </div>

            {/* --- اليمين: الترمينال (Terminal) --- */}
            {/* الترمينال يبقى داكنًا دائمًا للحفاظ على شكل الكود، وهذا يعطي تباينًا جميلاً في الوضع الفاتح */}
            <div ref={rightColRef} className="h-full">
              <Terminal>
                
                {/* السطر 1 */}
                <TypingAnimation delay={500}>whoami</TypingAnimation>
                
                {/* النتيجة */}
                <AnimatedSpan delay={1500} className="text-zinc-400 pl-6">
                  "Front-End Developer"
                </AnimatedSpan>

                {/* السطر 2 */}
                <TypingAnimation delay={2000}>cat skills.json</TypingAnimation>

                {/* النتيجة JSON */}
                <AnimatedSpan delay={3000} className="text-yellow-300">
                  {`{`}
                </AnimatedSpan>
                
                <AnimatedSpan delay={3100} className="pl-4">
                  <span className="text-purple-400">"stack"</span>: [
                </AnimatedSpan>
                
                <AnimatedSpan delay={3200} className="pl-8 text-green-300">
                  "React", "Next.js", "Tailwind",
                </AnimatedSpan>
                
                <AnimatedSpan delay={3300} className="pl-8 text-green-300">
                  "TypeScript", "Redux", "GSAP"
                </AnimatedSpan>
                
                <AnimatedSpan delay={3400} className="pl-4">
                  ],
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="pl-4">
                  <span className="text-purple-400">"focus"</span>: <span className="text-blue-300">"Performance & UX"</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3600} className="text-yellow-300">
                  {`}`}
                </AnimatedSpan>

                <AnimatedSpan delay={4000} className="mt-4">
                  <span className="text-green-400">➜ ~</span> <span className="animate-pulse">_</span>
                </AnimatedSpan>

              </Terminal>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { cn } from '../lib/utils.js';
import Hero from "@/components/sections/Hero.jsx";
import About from "@/components/sections/About.jsx";
import Skills from "@/components/sections/Skills.jsx";
import Projects from "@/components/sections/Projects.jsx";
import Contact from "@/components/sections/Contact.jsx";
import Footer from '@/components/shared/Footer.jsx';


// استدعاء الشبكة المربعة (InteractiveGridPattern)
const InteractiveGridPattern = dynamic(
  () => import('../components/ui/interactive-grid-pattern.jsx').then((mod) => mod.InteractiveGridPattern),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      {/* الحاوية الرئيسية: تغطي Hero و About */}
      <div className="relative w-full overflow-hidden bg-black">
        
        {/* الخلفية المربعة: تبدأ من أعلى الشاشة */}
        <InteractiveGridPattern
          width={40}   // حجم المربع
          height={40}
          className={cn(
            "[mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]",
            "absolute inset-0 z-0 h-full opacity-30" // opacity لتقليل حدة الخطوط
          )}
        />

        {/* المحتوى: Hero و About */}
        {/* pt-24 لتعويض مكان النافبار الثابتة */}
        <div className="relative z-10 pt-24">
          <Hero />
          <About />
        </div>
      </div>

      {/* باقي الأقسام */}
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
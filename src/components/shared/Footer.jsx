'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Mail, Copyright, Code, ArrowUpRight } from 'lucide-react';

// ***** استيراد FlickeringGrid من مسار shadcn/ui المتوقع *****
import { FlickeringGrid } from '../ui/flickering-grid'; 
// **********************************************************

export default function Footer() {
    
    // بياناتك الشخصية
    const authorName = "YMM539 (Youssef Muhammad mahmoud)";
    const linkedinUrl = "https://www.linkedin.com/in/%D9%8A%D9%88%D8%B3%D9%81-%D9%85%D8%AD%D9%85%D8%AF-%D9%85%D8%AD%D9%85%D9%88%D8%AF-%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D9%81%D8%AA%D8%A7%D8%AD-2ba01b373/";
    const emailAddress = "youssefy.f123456@gmail.com";
    const currentYear = new Date().getFullYear();

    // روابط التنقل الرئيسية (يمكنك تخصيصها)
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '#contact' },
        // يمكنك إضافة المزيد هنا
    ];

    return (
        // تم زيادة الـ padding العمودي (py-24 بدلاً من pt-20 pb-10)
        <footer id="footer" className=" text-white relative overflow-hidden py-24">
            
            {/* 1. خلفية Flickering Grid */}
            <FlickeringGrid 
                className="absolute inset-0 z-0 h-full w-full" 
                color="#333333" 
            />

            {/* 2. محتوى الفوتر (Relative Z-index) */}
            <div className="container mx-auto px-4 relative z-10">
                
                
                
                {/* --- القسم السفلي: الشبكة (Grid) للمعلومات --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    
                    {/* العمود 1: الشعار وحقوق النشر */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="flex items-center space-x-2">
                            <Code size={24} className="text-white" />
                            <Link href="/" className="text-xl font-bold tracking-tight text-white">
                                {authorName.split(' ')[0]} Dev
                            </Link>
                        </div>
                        <p className="text-sm text-zinc-500 flex items-center gap-1 mt-4">
                            <Copyright size={14} /> {currentYear} | All Rights Reserved.
                        </p>
                    </div>

                    {/* العمود 2: روابط التنقل */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold mb-2 text-white border-b border-zinc-700 pb-2">Navigation</h4>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* العمود 3: التواصل */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold mb-2 text-white border-b border-zinc-700 pb-2">Connect</h4>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href={linkedinUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                                >
                                    <Linkedin size={16} /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a 
                                    href={`mailto:${emailAddress}`} 
                                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                                >
                                    <Mail size={16} /> Email
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* العمود 4: رؤية الموقع (يمكن تخصيصه لاحقاً) */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <h4 className="text-lg font-semibold mb-2 text-white border-b border-zinc-700 pb-2">My Vision</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Building elegant and high-performance digital experiences that drive user engagement and growth.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
'use client';

import { ThemeProvider } from 'next-themes';

// هذا المكون سيقوم بـ "تغليف" التطبيق بالكامل
export function Providers({ children }) {
  // attribute="class" يخبر المكتبة أن تستخدم كلاس "dark"
  // defaultTheme="system" يجعلها تتبع إعدادات النظام تلقائيًا
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
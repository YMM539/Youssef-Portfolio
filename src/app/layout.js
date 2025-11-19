import './globals.css';
import Navbar from '../components/shared/Navbar.jsx';
import { Providers } from './providers';

export const metadata = {
  title: "My Portfolio | YMM",
  description: "A personal site to showcase my work and web development skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white transition-colors duration-300">
        <Providers>
          {/* النافبار الآن fixed، لذا لا نحتاج لحاوية خاصة */}
          <Navbar />
          
          {/* أزلنا pt-16 لكي يبدأ المحتوى من أعلى الشاشة تماماً خلف النافبار */}
          <main className="relative">
            {children}
          </main>

        </Providers>
      </body>
    </html>
  );
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // هذا هو رابط مشروعك الذي ظهر في الخطأ
        hostname: 'wywtjlwbtpvijmkqurjs.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;

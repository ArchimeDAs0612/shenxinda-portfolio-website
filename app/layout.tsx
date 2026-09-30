import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://archimedas0612.github.io/shenxinda-portfolio-website/'),
  title: '沈鑫达｜算法 · 风险决策 · AI-native',
  description: '沈鑫达的个人作品集：厦门大学应用统计硕士，滴滴国际支付风控算法实习生。',
  alternates: { canonical: 'https://archimedas0612.github.io/shenxinda-portfolio-website/' },
  icons: { icon: '/shenxinda-portfolio-website/favicon.svg' },
  openGraph: {
    type: 'website', locale: 'zh_CN', siteName: '沈鑫达 · Career Portfolio',
    title: '沈鑫达｜算法 · 风险决策 · AI-native',
    description: '厦门大学应用统计硕士 · 滴滴国际支付风控算法实习 · 真实经历与 AI 实践。',
    url: 'https://archimedas0612.github.io/shenxinda-portfolio-website/',
    images: [{ url: 'https://archimedas0612.github.io/shenxinda-portfolio-website/images/profile/bdf5afa6a8fc8fc136fd282f6c467fcd.jpg', width: 1080, height: 1440, alt: '沈鑫达个人照片' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

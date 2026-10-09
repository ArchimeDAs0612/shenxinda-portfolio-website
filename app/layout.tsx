import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { portalContent } from '../content/portal-content';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(portalContent.url),
  title: portalContent.title,
  description: portalContent.description,
  alternates: { canonical: portalContent.url },
  icons: { icon: new URL('favicon.svg', portalContent.url).href },
  openGraph: {
    type: 'website', locale: 'zh_CN', siteName: '沈鑫达 · 个人品牌门户',
    title: portalContent.title,
    description: portalContent.description,
    url: portalContent.url,
    images: [{ url: new URL(portalContent.shareImage, portalContent.url).href, width: 1200, height: 630, alt: '沈鑫达：统计、风险决策与 AI 创作' }],
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

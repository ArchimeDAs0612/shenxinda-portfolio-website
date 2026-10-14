import type { Metadata } from 'next';
import Script from 'next/script';
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
    type: 'website', locale: 'zh_CN', siteName: '阿基米达 · 个人主页',
    title: portalContent.title,
    description: portalContent.description,
    url: portalContent.url,
    images: [{ url: new URL(portalContent.shareImage, portalContent.url).href, width: 1200, height: 630, alt: '阿基米达：统计、AI 创作与个人表达' }],
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
        <Script
          id="cloudflare-web-analytics"
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: portalContent.analyticsToken })}
        />
      </body>
    </html>
  );
}

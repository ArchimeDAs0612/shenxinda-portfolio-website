import type { Metadata } from 'next';
import { PortfolioPage } from '../page';
import { portalContent } from '../../content/portal-content';

/** An invite-only sharing view for recruiters and professional conversations. */
export const metadata: Metadata = {
  title: portalContent.careerTitle,
  description: portalContent.careerDescription,
  alternates: { canonical: portalContent.careerUrl },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website', locale: 'zh_CN', siteName: '沈鑫达 · 职业主页',
    title: portalContent.careerTitle,
    description: portalContent.careerDescription,
    url: portalContent.careerUrl,
    images: [{ url: new URL(portalContent.shareImage, portalContent.url).href, width: 1200, height: 630, alt: '沈鑫达的职业主页' }],
  },
};

export default function CareerPage() {
  return <PortfolioPage view="career" />;
}

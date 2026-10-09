import type { NextConfig } from 'next';

const isPagesBuild = process.env.GITHUB_PAGES === 'true';
const isRootPublication = process.env.PORTFOLIO_ROOT === 'true';

const nextConfig: NextConfig = {
  basePath: isPagesBuild && !isRootPublication ? '/shenxinda-portfolio-website' : undefined,
  assetPrefix: isPagesBuild && !isRootPublication ? '/shenxinda-portfolio-website/' : undefined,
};

export default nextConfig;

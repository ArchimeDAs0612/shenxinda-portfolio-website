import type { NextConfig } from 'next';

const isPagesBuild = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  basePath: isPagesBuild ? '/shenxinda-portfolio-website' : undefined,
  assetPrefix: isPagesBuild ? '/shenxinda-portfolio-website/' : undefined,
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/vitalize-estetica-avancada' : '',
};

export default nextConfig;

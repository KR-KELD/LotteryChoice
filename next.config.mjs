/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'LotteryChoice';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd && process.env.GITHUB_PAGES === 'true' ? `/${repo}` : '',
  assetPrefix: isProd && process.env.GITHUB_PAGES === 'true' ? `/${repo}/` : '',
};

export default nextConfig;

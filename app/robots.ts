import type { MetadataRoute } from 'next';

const SITE_URL = 'https://kr-keld.github.io/LotteryChoice';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

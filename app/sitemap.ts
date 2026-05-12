import type { MetadataRoute } from 'next';

const SITE_URL = 'https://kr-keld.github.io/LotteryChoice';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/guide/saju', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/guide/elements', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/guide/lucky-numbers', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/guide/lunar-calendar', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

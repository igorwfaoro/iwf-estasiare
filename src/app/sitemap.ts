import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: '/e/*',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: '/*',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    }
  ];
}

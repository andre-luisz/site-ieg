// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://iegfloriano.site',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/sobre',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/programacao',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/momentos',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/mensagens',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/doar',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/visite',
      lastModified,
    },
    {
      url: 'https://iegfloriano.site/contato',
      lastModified,
    },
  ];
}

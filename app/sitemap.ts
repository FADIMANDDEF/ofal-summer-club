import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ofal-summer-club.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: albums } = await supabase.from('albums').select('slug, created_at');

  const albumEntries: MetadataRoute.Sitemap = (albums || []).map((album) => ({
    url: `${siteUrl}/gallery/${album.slug}`,
    lastModified: album.created_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/albums`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...albumEntries,
  ];
}

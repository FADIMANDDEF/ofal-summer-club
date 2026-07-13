import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MasonryGallery from '@/components/MasonryGallery';
import FloralAccent from '@/components/FloralAccent';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Calendar, Images, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Album, Photo } from '@/types';

export const revalidate = 60;

async function getAlbum(slug: string): Promise<{ album: Album; photos: Photo[] } | null> {
  const supabase = await createClient();

  const { data: album } = await supabase
    .from('albums')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!album) return null;

  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('album_id', album.id)
    .order('created_at', { ascending: true });

  return { album, photos: photos || [] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAlbum(slug);
  if (!data) return {};

  return {
    title: data.album.title,
    description: `Galerie photo de ${data.album.title} — OFAL Summer Club.`,
    openGraph: {
      title: data.album.title,
      images: data.album.cover ? [data.album.cover] : [],
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getAlbum(slug);

  if (!data) notFound();

  const { album, photos } = data;

  return (
    <div className="pb-24 pt-32">
      <div className="container-ofal mb-12">
        <Link
          href="/albums"
          className="mb-8 inline-flex items-center gap-2 text-sm text-dolce-500 transition hover:text-dolce-800"
        >
          <ArrowLeft size={16} /> Tous les albums
        </Link>

        <div className="flex flex-col items-center text-center">
          <FloralAccent className="mb-4 h-5 w-20 text-bloom-500" />
          <h1 className="font-display text-4xl text-dolce-800 sm:text-5xl">{album.title}</h1>
          {album.description && (
            <p className="mt-3 max-w-xl text-dolce-500">{album.description}</p>
          )}
          <div className="mt-4 flex items-center gap-5 text-sm text-dolce-400">
            {album.event_date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(album.event_date)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Images size={14} /> {photos.length} photo{photos.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="container-ofal">
        <MasonryGallery photos={photos} albumTitle={album.title} />
      </div>
    </div>
  );
}

import Hero from '@/components/Hero';
import AlbumCard from '@/components/AlbumCard';
import FloralAccent from '@/components/FloralAccent';
import { createClient } from '@/lib/supabase/server';
import type { Album } from '@/types';
import Link from 'next/link';

async function getRecentAlbums(): Promise<Album[]> {
  const supabase = await createClient();
  const { data: albums } = await supabase
    .from('albums')
    .select('*, photos(count)')
    .order('created_at', { ascending: false })
    .limit(3);

  if (!albums) return [];

  return albums.map((a: any) => ({
    ...a,
    photo_count: a.photos?.[0]?.count ?? 0,
  }));
}

export default async function HomePage() {
  const albums = await getRecentAlbums();

  return (
    <>
      <Hero />

      <section className="container-ofal py-24">
        <div className="mb-14 flex flex-col items-center text-center">
          <FloralAccent className="mb-4 h-5 w-20 text-bloom-500" />
          <h2 className="font-display text-3xl text-dolce-800 sm:text-4xl">
            Nos derniers ateliers
          </h2>
          <p className="mt-3 max-w-md text-dolce-500">
            Un aperçu des souvenirs les plus récents, prêts à être redécouverts.
          </p>
        </div>

        {albums.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, i) => (
              <AlbumCard key={album.id} album={album} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-dolce-400">
            Les premiers albums arrivent très bientôt.
          </p>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            href="/albums"
            className="rounded-full border border-dolce-200 px-7 py-3 text-sm font-medium text-dolce-700 transition-colors hover:bg-dolce-700 hover:text-cream"
          >
            Voir tous les albums
          </Link>
        </div>
      </section>
    </>
  );
}

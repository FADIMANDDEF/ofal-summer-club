import type { Metadata } from 'next';
import AlbumCard from '@/components/AlbumCard';
import FloralAccent from '@/components/FloralAccent';
import { createClient } from '@/lib/supabase/server';
import type { Album } from '@/types';

export const metadata: Metadata = {
  title: 'Albums',
  description: 'Retrouvez tous les ateliers OFAL Summer Club et leurs galeries photo.',
};

export const revalidate = 60;

async function getAlbums(): Promise<Album[]> {
  const supabase = await createClient();
  const { data: albums } = await supabase
    .from('albums')
    .select('*, photos(count)')
    .order('event_date', { ascending: false, nullsFirst: false });

  if (!albums) return [];

  return albums.map((a: any) => ({
    ...a,
    photo_count: a.photos?.[0]?.count ?? 0,
  }));
}

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <div className="container-ofal py-32">
      <div className="mb-14 flex flex-col items-center text-center">
        <FloralAccent className="mb-4 h-5 w-20 text-bloom-500" />
        <h1 className="font-display text-4xl text-dolce-800 sm:text-5xl">Nos albums</h1>
        <p className="mt-3 max-w-lg text-dolce-500">
          Chaque atelier a son propre album. Cliquez sur une carte pour retrouver et
          télécharger vos souvenirs.
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
          Aucun album disponible pour le moment. Revenez bientôt !
        </p>
      )}
    </div>
  );
}

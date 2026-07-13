'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Images as ImagesIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import LogoutButton from '@/components/admin/LogoutButton';
import AlbumFormModal from '@/components/admin/AlbumFormModal';
import type { Album } from '@/types';

export default function AdminDashboardPage() {
  const supabase = createClient();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('albums')
      .select('*, photos(count)')
      .order('created_at', { ascending: false });

    setAlbums(
      (data || []).map((a: any) => ({ ...a, photo_count: a.photos?.[0]?.count ?? 0 }))
    );
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  async function handleDelete(album: Album) {
    if (
      !confirm(
        `Supprimer l'album "${album.title}" ainsi que toutes ses photos ? Cette action est définitive.`
      )
    )
      return;

    // Supprime d'abord les fichiers du bucket, puis l'album (les photos suivent par cascade).
    const { data: photos } = await supabase.from('photos').select('image_url').eq('album_id', album.id);
    const paths = (photos || [])
      .map((p) => p.image_url.split('/photos/')[1])
      .filter(Boolean) as string[];

    if (paths.length > 0) {
      await supabase.storage.from('photos').remove(paths);
    }
    await supabase.from('albums').delete().eq('id', album.id);
    loadAlbums();
  }

  return (
    <div className="container-ofal py-32">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl text-dolce-800">Tableau de bord</h1>
          <p className="mt-1 text-sm text-dolce-400">Gérez vos albums et vos photos</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingAlbum(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-dolce-700 px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-dolce-800"
          >
            <Plus size={16} /> Nouvel album
          </button>
          <LogoutButton />
        </div>
      </div>

      {loading ? (
        <p className="text-dolce-400">Chargement...</p>
      ) : albums.length === 0 ? (
        <p className="text-dolce-400">Aucun album pour le moment. Créez-en un pour commencer.</p>
      ) : (
        <div className="overflow-hidden rounded-xl2 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-dolce-100 bg-dolce-50 text-dolce-500">
              <tr>
                <th className="px-5 py-3 font-medium">Album</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Photos</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <tr key={album.id} className="border-b border-dolce-50 last:border-0">
                  <td className="flex items-center gap-3 px-5 py-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-dolce-100">
                      {album.cover ? (
                        <Image src={album.cover} alt={album.title} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-dolce-300">
                          <ImagesIcon size={16} />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-dolce-800">{album.title}</span>
                  </td>
                  <td className="px-5 py-3 text-dolce-500">{formatDate(album.event_date) || '—'}</td>
                  <td className="px-5 py-3 text-dolce-500">{album.photo_count}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/albums/${album.id}`}
                        className="rounded-full border border-dolce-200 px-3 py-1.5 text-xs text-dolce-600 transition hover:bg-dolce-700 hover:text-cream"
                      >
                        Gérer les photos
                      </Link>
                      <button
                        onClick={() => {
                          setEditingAlbum(album);
                          setModalOpen(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-dolce-200 text-dolce-500 transition hover:bg-dolce-50"
                        aria-label="Modifier"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(album)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-dolce-200 text-red-500 transition hover:bg-red-50"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <AlbumFormModal
          album={editingAlbum}
          onClose={() => setModalOpen(false)}
          onSaved={loadAlbums}
        />
      )}
    </div>
  );
}

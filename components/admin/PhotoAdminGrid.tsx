'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Photo } from '@/types';

export default function PhotoAdminGrid({
  photos,
  albumId,
  onChanged,
}: {
  photos: Photo[];
  albumId: string;
  onChanged: () => void;
}) {
  const supabase = createClient();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDelete(photo: Photo) {
    if (!confirm('Supprimer cette photo ? Cette action est définitive.')) return;
    setBusyId(photo.id);

    const path = photo.image_url.split('/photos/')[1];
    if (path) {
      await supabase.storage.from('photos').remove([path]);
    }
    await supabase.from('photos').delete().eq('id', photo.id);

    setBusyId(null);
    onChanged();
  }

  async function handleSetCover(photo: Photo) {
    setBusyId(photo.id);
    await supabase.from('albums').update({ cover: photo.image_url }).eq('id', albumId);
    setBusyId(null);
    onChanged();
  }

  if (photos.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-dolce-400">
        Aucune photo dans cet album pour le moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative overflow-hidden rounded-xl bg-dolce-100">
          <div className="relative aspect-square w-full">
            <Image
              src={photo.image_url}
              alt="Photo de l'album"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-end justify-end gap-1.5 bg-gradient-to-t from-dolce-900/60 via-transparent to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              disabled={busyId === photo.id}
              onClick={() => handleSetCover(photo)}
              title="Définir comme couverture"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-butter-500 transition hover:bg-white disabled:opacity-50"
            >
              <Star size={14} />
            </button>
            <button
              disabled={busyId === photo.id}
              onClick={() => handleDelete(photo)}
              title="Supprimer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 transition hover:bg-white disabled:opacity-50"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

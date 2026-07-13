'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import UploadZone from '@/components/admin/UploadZone';
import PhotoAdminGrid from '@/components/admin/PhotoAdminGrid';
import LogoutButton from '@/components/admin/LogoutButton';
import type { Album, Photo } from '@/types';

export default function AdminAlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const { data: albumData } = await supabase.from('albums').select('*').eq('id', id).single();
    const { data: photosData } = await supabase
      .from('photos')
      .select('*')
      .eq('album_id', id)
      .order('created_at', { ascending: true });

    if (!albumData) {
      router.push('/admin/dashboard');
      return;
    }

    setAlbum(albumData);
    setPhotos(photosData || []);
    setLoading(false);
  }, [id, router, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading || !album) {
    return <div className="container-ofal py-32 text-dolce-400">Chargement...</div>;
  }

  return (
    <div className="container-ofal py-32">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-dolce-500 transition hover:text-dolce-800"
        >
          <ArrowLeft size={16} /> Retour au tableau de bord
        </Link>
        <LogoutButton />
      </div>

      <div className="mb-10">
        <h1 className="font-display text-3xl text-dolce-800">{album.title}</h1>
        <p className="mt-1 text-sm text-dolce-400">
          {photos.length} photo{photos.length > 1 ? 's' : ''} dans cet album
        </p>
      </div>

      <div className="mb-10">
        <UploadZone albumId={album.id} onUploaded={loadData} />
      </div>

      <PhotoAdminGrid photos={photos} albumId={album.id} onChanged={loadData} />
    </div>
  );
}

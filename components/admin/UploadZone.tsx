'use client';

import { useCallback, useState, DragEvent } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function UploadZone({
  albumId,
  onUploaded,
}: {
  albumId: string;
  onUploaded: () => void;
}) {
  const supabase = createClient();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleFiles = useCallback(
    async (files: FileList) => {
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (imageFiles.length === 0) return;

      setUploading(true);
      setProgress({ done: 0, total: imageFiles.length });

      for (const file of imageFiles) {
        const ext = file.name.split('.').pop();
        const path = `${albumId}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(path, file, { cacheControl: '31536000', upsert: false });

        if (!uploadError) {
          const { data: publicUrl } = supabase.storage.from('photos').getPublicUrl(path);

          const dimensions = await getImageDimensions(file);

          await supabase.from('photos').insert({
            album_id: albumId,
            image_url: publicUrl.publicUrl,
            width: dimensions.width,
            height: dimensions.height,
          });
        }

        setProgress((p) => ({ ...p, done: p.done + 1 }));
      }

      setUploading(false);
      onUploaded();
    },
    [albumId, onUploaded, supabase]
  );

  function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => resolve({ width: 800, height: 1000 });
      img.src = url;
    });
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`flex flex-col items-center justify-center rounded-xl2 border-2 border-dashed p-10 text-center transition-colors ${
        dragging ? 'border-dolce-500 bg-dolce-50' : 'border-dolce-200 bg-white'
      }`}
    >
      {uploading ? (
        <>
          <Loader2 className="mb-3 animate-spin text-dolce-500" size={28} />
          <p className="text-sm text-dolce-600">
            Envoi en cours... {progress.done}/{progress.total}
          </p>
        </>
      ) : (
        <>
          <UploadCloud className="mb-3 text-dolce-400" size={28} />
          <p className="text-sm text-dolce-600">
            Glissez-déposez vos photos ici, ou
          </p>
          <label className="mt-3 cursor-pointer rounded-full bg-dolce-700 px-5 py-2 text-sm font-medium text-cream transition hover:bg-dolce-800">
            Parcourir
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </label>
          <p className="mt-3 text-xs text-dolce-300">JPG, PNG, WEBP — plusieurs fichiers possibles</p>
        </>
      )}
    </div>
  );
}

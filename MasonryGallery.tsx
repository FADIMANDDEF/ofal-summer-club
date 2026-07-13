'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Download, Share2 } from 'lucide-react';
import type { Photo } from '@/types';
import { downloadImage } from '@/lib/download';

export default function MasonryGallery({ photos, albumTitle }: { photos: Photo[]; albumTitle: string }) {
  if (photos.length === 0) {
    return (
      <div className="py-24 text-center text-dolce-400">
        <p className="font-display text-2xl text-dolce-600">Aucune photo pour le moment</p>
        <p className="mt-2 text-sm">Revenez bientôt, les souvenirs de cet atelier arrivent !</p>
      </div>
    );
  }

  const handleShare = async (photo: Photo) => {
    const shareData = {
      title: albumTitle,
      text: `Une photo de ${albumTitle} — OFAL Summer Club`,
      url: photo.image_url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // partage annulé par l'utilisateur — rien à faire
      }
    } else {
      await navigator.clipboard.writeText(photo.image_url);
    }
  };

  return (
    <PhotoProvider maskOpacity={0.92}>
      <div className="masonry">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
            className="masonry-item group relative overflow-hidden rounded-xl2 bg-dolce-100 shadow-card"
          >
            <PhotoView src={photo.image_url}>
              <div className="relative cursor-zoom-in">
                <Image
                  src={photo.image_url}
                  alt={`${albumTitle} — photo ${i + 1}`}
                  width={photo.width || 800}
                  height={photo.height || 1000}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dolce-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </PhotoView>

            <div className="pointer-events-none absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(photo.image_url, `ofal-${albumTitle}-${i + 1}.jpg`);
                }}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-dolce-700 shadow-soft backdrop-blur transition hover:bg-white"
                aria-label="Télécharger la photo"
              >
                <Download size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(photo);
                }}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-dolce-700 shadow-soft backdrop-blur transition hover:bg-white"
                aria-label="Partager la photo"
              >
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </PhotoProvider>
  );
}

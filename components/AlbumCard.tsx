'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Images } from 'lucide-react';
import type { Album } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AlbumCard({ album, index = 0 }: { album: Album; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: 'easeOut' }}
    >
      <Link
        href={`/gallery/${album.slug}`}
        className="group block overflow-hidden rounded-xl2 bg-white shadow-card transition-shadow duration-300 hover:shadow-soft"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-dolce-100">
          {album.cover ? (
            <Image
              src={album.cover}
              alt={album.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-dolce-300">
              <Images size={32} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dolce-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-5">
          <h3 className="font-display text-xl text-dolce-800">{album.title}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-dolce-400">
            {album.event_date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(album.event_date)}
              </span>
            )}
            {typeof album.photo_count === 'number' && (
              <span className="inline-flex items-center gap-1.5">
                <Images size={14} />
                {album.photo_count} photo{album.photo_count > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';
import type { Album } from '@/types';

export default function AlbumFormModal({
  album,
  onClose,
  onSaved,
}: {
  album?: Album | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const supabase = createClient();
  const [title, setTitle] = useState(album?.title || '');
  const [eventDate, setEventDate] = useState(album?.event_date || '');
  const [description, setDescription] = useState(album?.description || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const slug = slugify(title);
    let failed = false;

    if (album) {
      const { error: updateError } = await supabase
        .from('albums')
        .update({ title, slug, event_date: eventDate || null, description: description || null })
        .eq('id', album.id);

      if (updateError) {
        setError("Une erreur est survenue lors de l'enregistrement.");
        failed = true;
      }
    } else {
      const { error: insertError } = await supabase
        .from('albums')
        .insert({ title, slug, event_date: eventDate || null, description: description || null });

      if (insertError) {
        setError('Une erreur est survenue. Ce nom d\'album existe peut-être déjà.');
        failed = true;
      }
    }

    setSaving(false);

    if (!failed) {
      onSaved();
      onClose();
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-dolce-900/50 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-xl2 bg-cream p-6 shadow-soft"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl text-dolce-800">
              {album ? "Modifier l'album" : 'Nouvel album'}
            </h2>
            <button onClick={onClose} className="text-dolce-400 hover:text-dolce-700">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-dolce-600">Nom de l'atelier</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Paint & Floral Studio"
                className="w-full rounded-lg border border-dolce-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-dolce-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-dolce-600">Date de l'événement</label>
              <input
                type="date"
                value={eventDate || ''}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-lg border border-dolce-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-dolce-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-dolce-600">Description (optionnel)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-dolce-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-dolce-500"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-dolce-700 py-2.5 text-sm font-medium text-cream transition hover:bg-dolce-800 disabled:opacity-60"
            >
              {saving ? 'Enregistrement...' : album ? 'Enregistrer' : "Créer l'album"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

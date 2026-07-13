'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FloralAccent from './FloralAccent';

export default function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-dolce-800">
      {/* Image de couverture — remplacez /public/images/hero.svg par une vraie photo (hero.jpg) et mettez à jour le chemin ci-dessous */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.svg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dolce-900/60 via-dolce-800/40 to-cream" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-5 rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-butter-200"
        >
          Album souvenirs
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-balance font-display text-5xl font-medium leading-tight sm:text-6xl md:text-7xl"
        >
          OFAL Summer Club
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-balance text-lg font-light text-white/90 sm:text-xl"
        >
          Revivez tous nos ateliers et téléchargez vos souvenirs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10"
        >
          <Link
            href="/albums"
            className="group inline-flex items-center gap-2 rounded-full bg-butter-300 px-8 py-3.5 text-sm font-medium text-dolce-800 shadow-soft transition-all hover:bg-butter-200 hover:shadow-lg"
          >
            Découvrir les albums
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14"
        >
          <FloralAccent className="h-6 w-28 text-butter-200" />
        </motion.div>
      </div>
    </section>
  );
}

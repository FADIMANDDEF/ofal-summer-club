'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-ofal flex items-center justify-between py-4">
        <Link
          href="/"
          className={`font-display text-lg tracking-wide transition-colors ${
            scrolled ? 'text-dolce-800' : 'text-white'
          }`}
        >
          OFAL <span className="italic font-normal">Summer Club</span>
        </Link>
        <Link
          href="/albums"
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            scrolled
              ? 'bg-dolce-700 text-cream hover:bg-dolce-800'
              : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
          }`}
        >
          Albums
        </Link>
      </nav>
    </motion.header>
  );
}

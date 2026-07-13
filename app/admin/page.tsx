'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import FloralAccent from '@/components/FloralAccent';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (authError) {
      setError('Identifiants incorrects. Veuillez réessayer.');
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dolce-800 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm rounded-xl2 bg-cream p-8 shadow-soft"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <FloralAccent className="mb-3 h-5 w-20 text-bloom-500" />
          <h1 className="font-display text-2xl text-dolce-800">Espace administration</h1>
          <p className="mt-1 text-sm text-dolce-400">OFAL Summer Club</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-dolce-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-dolce-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-dolce-500"
              placeholder="admin@ofal.fr"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-dolce-600" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-dolce-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-dolce-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-dolce-700 py-2.5 text-sm font-medium text-cream transition hover:bg-dolce-800 disabled:opacity-60"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

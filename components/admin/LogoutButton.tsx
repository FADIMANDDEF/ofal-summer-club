'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-dolce-200 px-4 py-2 text-sm text-dolce-600 transition hover:bg-dolce-700 hover:text-cream"
    >
      <LogOut size={15} /> Déconnexion
    </button>
  );
}

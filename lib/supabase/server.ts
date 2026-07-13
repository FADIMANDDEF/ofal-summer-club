import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Client Supabase utilisable dans les Server Components / routes serveur.
// Respecte la session de l'utilisateur (cookies) pour l'authentification admin.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignoré : appelé depuis un Server Component sans possibilité d'écrire des cookies.
          }
        },
      },
    }
  );
}

# OFAL Summer Club — Galerie photo

Application web premium pour partager et télécharger les photos des ateliers OFAL Summer Club.
Construite avec **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Supabase** et **Framer Motion**.

## ✨ Fonctionnalités

- Page d'accueil avec grand visuel Hero et derniers albums
- Page "Albums" listant tous les ateliers (cartes avec couverture, date, nombre de photos)
- Galerie type Pinterest (masonry) par album : lazy loading, plein écran, zoom, swipe mobile,
  téléchargement en qualité originale, partage
- Tableau de bord d'administration protégé par connexion (Supabase Auth) :
  créer / modifier / supprimer un album, glisser-déposer des photos, supprimer une photo,
  définir la couverture d'un album — sans toucher au code
- SEO : metadata, Open Graph, `sitemap.xml`, `robots.txt`
- 100 % responsive (iPhone, Android, tablette, desktop)

## 🧱 Stack technique

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres + Auth + Storage)
· Framer Motion · react-photo-view · lucide-react

## 🚀 Démarrage local

```bash
npm install
cp .env.example .env.local   # puis complétez les variables Supabase
npm run dev
```

L'application est disponible sur http://localhost:3000

## 🗄️ Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Dans **SQL Editor**, exécutez le contenu de `supabase/schema.sql`
   (crée les tables `albums` / `photos`, les policies RLS, et le bucket Storage `photos`)
3. Dans **Authentication > Users**, créez manuellement un utilisateur administrateur
   (email + mot de passe) — c'est ce compte qui se connectera sur `/admin`
4. Dans **Project Settings > API**, récupérez :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` (optionnelle, non utilisée par défaut) → `SUPABASE_SERVICE_ROLE_KEY`

## ☁️ Déploiement sur Vercel

1. Poussez ce projet sur GitHub
2. Importez le repo dans [Vercel](https://vercel.com/new)
3. Ajoutez les variables d'environnement dans **Settings > Environment Variables** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Déployez — c'est tout, aucune configuration supplémentaire n'est nécessaire

## 🔑 Utilisation de l'administration

1. Rendez-vous sur `/admin`
2. Connectez-vous avec le compte créé dans Supabase Authentication
3. Depuis le tableau de bord :
   - **Nouvel album** pour créer un atelier (nom, date, description)
   - **Gérer les photos** pour glisser-déposer des images, en supprimer, ou définir
     la couverture de l'album (icône étoile)
4. Partagez simplement le lien `/gallery/nom-de-lalbum` aux participantes — aucun
   compte n'est requis pour consulter et télécharger les photos

## 🎨 Personnalisation

- Couleurs, typographies : `tailwind.config.ts`
- Image du Hero : remplacez `public/images/hero.svg` par une vraie photo
  (`public/images/hero.jpg`) et mettez à jour le chemin dans `components/Hero.tsx`
- Textes de la page d'accueil : `app/page.tsx`

## 📁 Structure du projet

```text
app/                  Pages (App Router) : accueil, albums, galerie, admin
components/           Composants réutilisables (Hero, AlbumCard, MasonryGallery...)
components/admin/     Composants du tableau de bord (upload, formulaires...)
lib/                  Clients Supabase (browser / serveur / admin) et utilitaires
hooks/                Hooks React réutilisables
types/                Types TypeScript partagés
supabase/schema.sql   Schéma SQL complet (tables, RLS, bucket Storage)
public/               Assets statiques (favicon, image de Hero)
```

## 🔒 Sécurité

- Les routes `/admin/*` sont protégées par middleware (redirection vers `/admin`
  si non authentifié)
- Les opérations d'écriture (créer/modifier/supprimer albums et photos) sont
  restreintes aux utilisateurs authentifiés via Row Level Security côté Supabase
- La lecture des albums et photos est publique (les participantes n'ont pas de compte)

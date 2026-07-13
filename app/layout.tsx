import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ofal-summer-club.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OFAL Summer Club — Galerie souvenirs',
    template: '%s | OFAL Summer Club',
  },
  description:
    "Revivez tous nos ateliers OFAL Summer Club et téléchargez vos souvenirs en haute qualité : Paint & Floral Studio, Self Makeup Class, Pizza Lab, et bien d'autres.",
  keywords: ['OFAL Summer Club', 'ateliers', 'galerie photo', 'souvenirs', 'événements'],
  openGraph: {
    title: 'OFAL Summer Club — Galerie souvenirs',
    description: 'Revivez tous nos ateliers et téléchargez vos souvenirs.',
    url: siteUrl,
    siteName: 'OFAL Summer Club',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OFAL Summer Club — Galerie souvenirs',
    description: 'Revivez tous nos ateliers et téléchargez vos souvenirs.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import Link from 'next/link';
import FloralAccent from '@/components/FloralAccent';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <FloralAccent className="mb-5 h-6 w-24 text-bloom-500" />
      <h1 className="font-display text-4xl text-dolce-800">Page introuvable</h1>
      <p className="mt-3 max-w-sm text-dolce-500">
        Cet album ou cette page n'existe pas, ou a peut-être été déplacé.
      </p>
      <Link
        href="/albums"
        className="mt-8 rounded-full bg-dolce-700 px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-dolce-800"
      >
        Voir les albums
      </Link>
    </div>
  );
}

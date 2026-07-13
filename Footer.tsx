import FloralAccent from './FloralAccent';

export default function Footer() {
  return (
    <footer className="border-t border-dolce-100 bg-white/60">
      <div className="container-ofal flex flex-col items-center gap-4 py-12 text-center">
        <FloralAccent className="h-6 w-24 text-bloom-500" />
        <p className="font-display text-xl text-dolce-800">OFAL Summer Club</p>
        <p className="max-w-md text-sm text-dolce-500">
          Revivez tous nos ateliers et téléchargez vos souvenirs en toute simplicité.
        </p>
        <p className="text-xs text-dolce-300">
          © {new Date().getFullYear()} OFAL Summer Club — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

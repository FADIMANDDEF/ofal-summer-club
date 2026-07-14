// Télécharge une image en qualité originale.
// Sur iPhone/mobile, utilise le partage natif quand c'est possible : ça propose
// "Enregistrer l'image" et sauvegarde directement dans l'application Photos,
// au lieu d'atterrir dans l'application Fichiers comme le ferait un simple lien.
export async function downloadImage(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });

    const nav = navigator as Navigator & {
      canShare?: (data?: ShareData) => boolean;
      share?: (data: ShareData) => Promise<void>;
    };

    if (nav.canShare && nav.share && nav.canShare({ files: [file] })) {
      await nav.share({ files: [file] });
      return;
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Téléchargement impossible :', error);
    window.open(url, '_blank');
  }
}

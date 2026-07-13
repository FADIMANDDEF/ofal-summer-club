// Force le téléchargement d'une image en qualité originale, même si elle est
// hébergée sur un autre domaine (Supabase Storage) — évite l'ouverture dans
// un nouvel onglet que ferait un simple lien <a href>.
export async function downloadImage(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
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

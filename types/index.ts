export interface Album {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  event_date: string | null;
  description: string | null;
  created_at: string;
  photo_count?: number;
}

export interface Photo {
  id: string;
  album_id: string;
  image_url: string;
  width: number | null;
  height: number | null;
  created_at: string;
}

export interface AlbumWithPhotos extends Album {
  photos: Photo[];
}

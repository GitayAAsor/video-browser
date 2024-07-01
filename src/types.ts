export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  image_url: string;
  genre_id: number;
}

export interface Data {
  genres: Genre[];
  videos: Video[];
}

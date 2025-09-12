export interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  albumId: string;
  uploadDate: Date;
  tags?: string[];
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  photos: Photo[];
  createdDate: Date;
  eventDate?: Date;
}

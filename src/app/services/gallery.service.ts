
import { Injectable, signal, computed } from '@angular/core';
import { Album, Photo } from '../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private albums = signal<Album[]>([
    {
      id: '1',
      title: 'Season 2024',
      description: 'Highlights from our 2024 season',
      coverImageUrl: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Season+2024',
      createdDate: new Date('2024-01-01'),
      eventDate: new Date('2024-12-31'),
      photos: [
        {
          id: 'p1',
          title: 'Team Photo',
          description: 'Official team photo for 2024',
          imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Team+Photo',
          albumId: '1',
          uploadDate: new Date('2024-01-15'),
          tags: ['team', 'official']
        },
        {
          id: 'p2',
          title: 'Training Session',
          description: 'Intensive training session',
          imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Training',
          albumId: '1',
          uploadDate: new Date('2024-02-01'),
          tags: ['training', 'practice']
        }
      ]
    },
    {
      id: '2',
      title: 'Championship Match',
      description: 'Our championship victory',
      coverImageUrl: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Championship',
      createdDate: new Date('2024-06-15'),
      eventDate: new Date('2024-06-15'),
      photos: [
        {
          id: 'p3',
          title: 'Victory Celebration',
          description: 'Celebrating our championship win',
          imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Victory',
          albumId: '2',
          uploadDate: new Date('2024-06-15'),
          tags: ['victory', 'celebration', 'championship']
        }
      ]
    }
  ]);

  getAlbums() {
    return this.albums.asReadonly();
  }

  getAlbumById(id: string) {
    return computed(() => this.albums().find(album => album.id === id));
  }

  getPhotosByAlbum(albumId: string) {
    return computed(() => {
      const album = this.albums().find(a => a.id === albumId);
      return album?.photos || [];
    });
  }

  addAlbum(album: Omit<Album, 'id' | 'photos'>) {
    const newAlbum: Album = {
      ...album,
      id: Date.now().toString(),
      photos: []
    };
    this.albums.update(albums => [...albums, newAlbum]);
  }

  addPhoto(albumId: string, photo: Omit<Photo, 'id' | 'albumId'>) {
    const newPhoto: Photo = {
      ...photo,
      id: 'p' + Date.now().toString(),
      albumId
    };
    
    this.albums.update(albums => 
      albums.map(album => 
        album.id === albumId 
          ? { ...album, photos: [...album.photos, newPhoto] }
          : album
      )
    );
  }

  removeAlbum(id: string) {
    this.albums.update(albums => albums.filter(album => album.id !== id));
  }

  removePhoto(albumId: string, photoId: string) {
    this.albums.update(albums => 
      albums.map(album => 
        album.id === albumId 
          ? { ...album, photos: album.photos.filter(photo => photo.id !== photoId) }
          : album
      )
    );
  }

  updateAlbum(id: string, updates: Partial<Album>) {
    this.albums.update(albums => 
      albums.map(album => album.id === id ? { ...album, ...updates } : album)
    );
  }
}

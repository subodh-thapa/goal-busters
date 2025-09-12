import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { Album, Photo } from '../../models/gallery.model';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  private galleryService = inject(GalleryService);

  albums = this.galleryService.getAlbums();
  selectedAlbum: Album | null = null;
  selectedPhoto: Photo | null = null;

  selectAlbum(album: Album) {
    this.selectedAlbum = album;
    this.selectedPhoto = null;
  }

  selectPhoto(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closeAlbum() {
    this.selectedAlbum = null;
    this.selectedPhoto = null;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }

  getAlbumPhotos(albumId: string) {
    return this.galleryService.getPhotosByAlbum(albumId);
  }
}

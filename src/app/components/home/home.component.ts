import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UpdatesService } from '../../services/updates.service';
import { SponsorsService } from '../../services/sponsors.service';
import { Update } from '../../models/update.model';
import { Sponsor } from '../../models/sponsor.model';
import { LogoComponent } from '../logo/logo.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private updatesService = inject(UpdatesService);
  private sponsorsService = inject(SponsorsService);

  // Club titles count
  readonly titlesCount = 4;

  // Team photos for slideshow
  teamPhotos = [
    { src: 'assets/Cup_winner_GC.png', alt: 'Gorkha Cup 2025 Winners' },
    { src: 'assets/ERFC_35_RunnerUp.png', alt: 'ERFC Cup 2025 Runner Up' },
    { src: 'assets/gb_team.jpg', alt: 'Goal Busters team group photo on the field' },
    { src: 'assets/team_pic_1.jpg', alt: 'Goal Busters team photo 1' },
    { src: 'assets/team_pic_2.jpg', alt: 'Goal Busters team photo 2' }
  ];

  currentSlideIndex = 0;
  
  private autoSlideInterval: number | null = null;
  private readonly autoSlideDelay = 1500; // 2 seconds

  latestUpdates = this.updatesService.getLatestUpdates(3);
  importantUpdates = this.updatesService.getImportantUpdates();
  sponsors = this.sponsorsService.getActiveSponsors();

  getSponsorsByTier(tier: Sponsor['tier']) {
    return this.sponsorsService.getSponsorsByTier(tier);
  }

  // Calculate years active dynamically using the establishment year from AppComponent
  get yearsActive(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - AppComponent.ESTABLISHMENT_YEAR;
  }

  // Get establishment year for display
  get establishmentYear(): number {
    return AppComponent.ESTABLISHMENT_YEAR;
  }

  // Lifecycle methods
  ngOnInit(): void {
    // Only start auto-slide in browser environment
    if (typeof window !== 'undefined') {
      // Start auto-slide after a short delay to ensure component is fully initialized
      setTimeout(() => {
        try {
          this.startAutoSlide();
        } catch (error) {
          console.error('Error initializing auto-slide:', error);
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  // Auto-slide functionality
  private startAutoSlide(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return;
      }
      
      this.stopAutoSlide(); // Clear any existing interval first
      this.autoSlideInterval = window.setInterval(() => {
        this.nextSlide();
      }, this.autoSlideDelay);
    } catch (error) {
      console.error('Error starting auto-slide:', error);
    }
  }

  private stopAutoSlide(): void {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return;
      }
      
      if (this.autoSlideInterval !== null) {
        window.clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    } catch (error) {
      console.error('Error stopping auto-slide:', error);
    }
  }

  // Pause auto-slide on hover
  onSlideshowMouseEnter(): void {
    try {
      this.stopAutoSlide();
    } catch (error) {
      console.error('Error stopping auto-slide on mouse enter:', error);
    }
  }

  // Resume auto-slide when mouse leaves
  onSlideshowMouseLeave(): void {
    try {
      this.startAutoSlide();
    } catch (error) {
      console.error('Error starting auto-slide on mouse leave:', error);
    }
  }

  // Slideshow navigation methods
  nextSlide(): void {
    if (this.teamPhotos && this.teamPhotos.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.teamPhotos.length;
    }
  }

  previousSlide(): void {
    if (this.teamPhotos && this.teamPhotos.length > 0) {
      this.currentSlideIndex = this.currentSlideIndex === 0 
        ? this.teamPhotos.length - 1 
        : this.currentSlideIndex - 1;
    }
  }

  goToSlide(index: number): void {
    if (this.teamPhotos && this.teamPhotos.length > 0 && index >= 0 && index < this.teamPhotos.length) {
      this.currentSlideIndex = index;
    }
  }

  get currentPhoto() {
    if (this.teamPhotos && this.teamPhotos.length > 0 && this.currentSlideIndex < this.teamPhotos.length) {
      return this.teamPhotos[this.currentSlideIndex];
    }
    // Fallback to first photo if something goes wrong
    return this.teamPhotos && this.teamPhotos.length > 0 
      ? this.teamPhotos[0] 
      : { src: 'assets/gb_team.jpg', alt: 'Goal Busters team photo' };
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() size: 'small' | 'medium' | 'large' | 'header' = 'medium';
  
  logoPath = 'assets/goalbuster_transparent_edgebg.png';
  
  get logoClasses(): string {
    const baseClass = 'logo-image';
    return `${baseClass} ${this.size}`;
  }
}

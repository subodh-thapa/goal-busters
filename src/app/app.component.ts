import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Goal Busters';
  
  // Club establishment year - static so it can be accessed from other components
  static readonly ESTABLISHMENT_YEAR = 2015;
  
  // Get establishment year for template access
  get establishmentYear(): number {
    return AppComponent.ESTABLISHMENT_YEAR;
  }
  
  // Calculate years active dynamically
  get yearsActive(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - AppComponent.ESTABLISHMENT_YEAR;
  }
}

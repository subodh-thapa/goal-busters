import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UpdatesService } from '../../services/updates.service';
import { SponsorsService } from '../../services/sponsors.service';
import { Update } from '../../models/update.model';
import { Sponsor } from '../../models/sponsor.model';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private updatesService = inject(UpdatesService);
  private sponsorsService = inject(SponsorsService);

  latestUpdates = this.updatesService.getLatestUpdates(3);
  importantUpdates = this.updatesService.getImportantUpdates();
  sponsors = this.sponsorsService.getActiveSponsors();

  getSponsorsByTier(tier: Sponsor['tier']) {
    return this.sponsorsService.getSponsorsByTier(tier);
  }
}

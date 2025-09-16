import { Injectable, signal, computed } from '@angular/core';
import { Sponsor } from '../models/sponsor.model';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private sponsors = signal<Sponsor[]>([
    {
      id: '1',
      name: 'Urban InfraConstruction',
      logoUrl: 'assets/urban_construction.png',
      websiteUrl: 'https://urbaniconstruct.com',
      description: 'Leading infrastructure solutions provider specializing in transportation, transit, water resources, and construction projects across Texas.',
      tier: 'platinum',
      isActive: true
    },
    {
      id: '2',
      name: 'Your Restruant',
      logoUrl: 'assets/sample logo.png',
      websiteUrl: 'https://localfitness.com',
      description: 'CDelicious food for champions',
      tier: 'gold',
      isActive: true
    },
    {
      id: '3',
      name: 'Your Restruant',
      logoUrl: 'assets/sample logo.png',
      websiteUrl: 'https://communitybank.com',
      description: 'Delicious food for champions',
      tier: 'gold',
      isActive: true
    },
    {
      id: '4',
      name: 'Your Restruant',
      logoUrl: 'assets/sample logo.png',
      websiteUrl: 'https://pizzapalace.com',
      description: 'Delicious food for champions',
      tier: 'silver',
      isActive: true
    },
    {
      id: '5',
      name: 'Your Realtor',
      logoUrl: 'assets/sample logo.png',
      websiteUrl: 'https://autorepairpro.com',
      description: 'Keeping your home in top condition',
      tier: 'silver',
      isActive: true
    },
    {
      id: '6',
      name: 'Your Finance Company',
      logoUrl: 'assets/sample logo.png',
      websiteUrl: 'https://techsolutions.com',
      description: 'Keeping your finances in top condition',
      tier: 'bronze',
      isActive: true
    }
  ]);

  getSponsors() {
    return this.sponsors.asReadonly();
  }

  getActiveSponsors() {
    return computed(() => this.sponsors().filter(sponsor => sponsor.isActive));
  }

  getSponsorsByTier(tier: Sponsor['tier']) {
    return computed(() => this.sponsors().filter(sponsor => sponsor.tier === tier && sponsor.isActive));
  }

  addSponsor(sponsor: Omit<Sponsor, 'id'>) {
    const newSponsor: Sponsor = {
      ...sponsor,
      id: Date.now().toString()
    };
    this.sponsors.update(sponsors => [...sponsors, newSponsor]);
  }

  removeSponsor(id: string) {
    this.sponsors.update(sponsors => sponsors.filter(sponsor => sponsor.id !== id));
  }

  updateSponsor(id: string, updates: Partial<Sponsor>) {
    this.sponsors.update(sponsors => 
      sponsors.map(sponsor => sponsor.id === id ? { ...sponsor, ...updates } : sponsor)
    );
  }

  toggleSponsorStatus(id: string) {
    this.sponsors.update(sponsors => 
      sponsors.map(sponsor => 
        sponsor.id === id ? { ...sponsor, isActive: !sponsor.isActive } : sponsor
      )
    );
  }
}

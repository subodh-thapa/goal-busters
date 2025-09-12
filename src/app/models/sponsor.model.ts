export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  isActive: boolean;
}

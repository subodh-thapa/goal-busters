import { Injectable, signal, computed } from '@angular/core';
import { Update } from '../models/update.model';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {
  private updates = signal<Update[]>([
    {
      id: '1',
      title: 'Runner Up in the 2025 ERFC Cup',
      content: 'Goal Busters 35+ team achieved an outstanding second-place finish in the 2025 ERFC Cup! While we came short of our ultimate goal of winning it all, this remarkable accomplishment showcases the dedication and skill of our entire team. We extend our heartfelt gratitude to every player, team member, and friends who contributed to this incredible journey.',
      publishDate: new Date('2024-06-15'),
      category: 'match',
      isImportant: true,
      imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Championship+Victory'
    },
    {
      id: '2',
      title: 'Dallas Gurkha Cup 2025',
      content: 'Goal Busters will be participating in the Dallas Gurkha Cup 2025. The tournament will be held from August 23rd to August 25th at the Dallas. We are looking forward to the tournament.',
      publishDate: new Date('2025-09-10'),
      category: 'training',
      isImportant: false
    },
    {
      id: '3',
      title: 'Goal Busters annual picnic',
      content: 'Stayed tuned for the date of the annual Goal Busters picnic. Talks are in progress for the date and location. Reach out to the team management if you are interested in contributing to the event.',
      publishDate: new Date('2025-09-10'),
      category: 'event',
      isImportant: false,
      imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Team+BBQ'
    },
    {
      id: '4',
      title: 'New Team Jerseys',
      content: 'Our new team jerseys have arrived! They feature our updated logo and improved material for better performance. Distribution will be at the next training session.',
      publishDate: new Date('2025-09-10'),
      category: 'general',
      isImportant: false
    }
  ]);

  getUpdates() {
    return this.updates.asReadonly();
  }

  getLatestUpdates(limit: number = 5) {
    return computed(() => this.updates()
      .sort((a, b) => (b.publishDate?.getTime() ?? 0) - (a.publishDate?.getTime() ?? 0))
      .slice(0, limit)
    );
  }

  getImportantUpdates() {
    return computed(() => this.updates().filter(update => update.isImportant));
  }

  getUpdatesByCategory(category: Update['category']) {
    return computed(() => this.updates().filter(update => update.category === category));
  }

  addUpdate(update: Omit<Update, 'id'>) {
    const newUpdate: Update = {
      ...update,
      id: Date.now().toString()
    };
    this.updates.update(updates => [newUpdate, ...updates]);
  }

  removeUpdate(id: string) {
    this.updates.update(updates => updates.filter(update => update.id !== id));
  }

  updateUpdate(id: string, updates: Partial<Update>) {
    this.updates.update(updatesList => 
      updatesList.map(update => update.id === id ? { ...update, ...updates } : update)
    );
  }
}

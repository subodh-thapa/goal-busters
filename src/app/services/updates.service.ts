import { Injectable, signal, computed } from '@angular/core';
import { Update } from '../models/update.model';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {
  private updates = signal<Update[]>([
    {
      id: '1',
      title: 'Championship Victory!',
      content: 'We are thrilled to announce that Goal Busters has won the 2024 Championship! This victory is a testament to our hard work, dedication, and team spirit throughout the season.',
      publishDate: new Date('2024-06-15'),
      author: 'Sarah Davis',
      category: 'match',
      isImportant: true,
      imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Championship+Victory'
    },
    {
      id: '2',
      title: 'Training Schedule Update',
      content: 'Starting next week, our training sessions will be held on Tuesdays and Thursdays at 6:00 PM. Please arrive 15 minutes early for warm-up.',
      publishDate: new Date('2024-06-10'),
      author: 'Robert Taylor',
      category: 'training',
      isImportant: false
    },
    {
      id: '3',
      title: 'Team BBQ Event',
      content: 'Join us for our annual team BBQ on Saturday, July 20th at Riverside Park. Family and friends are welcome! Please RSVP by July 15th.',
      publishDate: new Date('2024-06-05'),
      author: 'Lisa Anderson',
      category: 'event',
      isImportant: false,
      imageUrl: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Team+BBQ'
    },
    {
      id: '4',
      title: 'New Team Jerseys',
      content: 'Our new team jerseys have arrived! They feature our updated logo and improved material for better performance. Distribution will be at the next training session.',
      publishDate: new Date('2024-05-28'),
      author: 'Sarah Davis',
      category: 'general',
      isImportant: false
    }
  ]);

  getUpdates() {
    return this.updates.asReadonly();
  }

  getLatestUpdates(limit: number = 5) {
    return computed(() => this.updates()
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
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

export interface Update {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
  author: string;
  category: 'match' | 'training' | 'general' | 'event';
  isImportant: boolean;
  imageUrl?: string;
}

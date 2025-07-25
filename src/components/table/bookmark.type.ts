export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  faviconUrl?: string;
  tags: string[];
  folder?: string;
  isFavorite?: boolean;
  createdAt: string;
  contentType?: 'article' | 'video' | 'tool' | 'code' | 'image' | 'other';
  privacy?: 'private' | 'public' | 'unlisted';
}

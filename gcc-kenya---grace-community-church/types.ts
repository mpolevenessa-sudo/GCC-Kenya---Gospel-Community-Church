
export type Theme = 'light' | 'dark' | 'system';

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  category: string;
  thumbnail: string;
  description: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'sermon' | 'event' | 'message';
}

export interface BibleBook {
  name: string;
  chapters: number;
}

export type BibleVersion = 'KJV' | 'NIV' | 'ESV' | 'NKJV';

export interface BibleVerse {
  number: number;
  text: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CurriculumLevel {
  title: string;
  age: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  location: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  ERROR = 'ERROR',
}
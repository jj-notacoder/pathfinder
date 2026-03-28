export interface Message {
  id: string;
  role: 'user' | 'pathfinder';
  content: string;
  isMatrix?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company?: string;
  university?: string;
  year?: string;
  major?: string;
  bio: string;
  rating: number;
  sessions: number;
  available: boolean;
  initials: string;
  specialties?: string[];
}

export interface VaultProfessional {
  id: number;
  name: string;
  role: string;
  exp: string;
  field: string;
  question: string;
  locked: boolean;
  careers?: string[];
  initials: string;
}

export interface Career {
  title: string;
  slug: string;
  field: string;
}

export interface MatrixCareer {
  title: string;
  whyFit: string;
  reality: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'residential' | 'commercial' | 'specialty';
  tagline: string;
  description: string;
  image: string;
  startingPrice: number;
  priceUnit: string;
  popular?: boolean;
  features: string[];
  safeFor: string[];
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BookingFormState {
  services: string[];
  homeSize: string; // 'under1500' | '1500-2500' | '2500-3500' | '3500+'
  stories: number; // 1 or 2
  drivewaySize: string; // 'none' | 'standard2car' | 'large3car' | 'longCircular'
  addons: string[];
  date: string;
  timeWindow: 'morning' | 'afternoon' | 'anytime';
  isUrgent: boolean;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  notes: string;
  smsUpdates: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  source: 'Google' | 'Angi' | 'HomeAdvisor';
  verified: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  beforeDescription: string;
  afterDescription: string;
  image: string;
  statLabel: string;
  statValue: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ServiceArea {
  city: string;
  county: string;
  zipList: string[];
  highlight?: boolean;
}

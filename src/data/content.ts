import { ServiceCategory } from '../types';
import { SERVICES } from './services';

export const LISTING_CATEGORIES: Array<'All' | ServiceCategory> = [
  'All',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'AC Repair',
];

export const HOME_CATEGORIES: Array<{
  name: string;
  price: string;
  icon: string;
  category: ServiceCategory;
}> = [
  { name: 'Plumbing', price: 'From ₹299', icon: '🔧', category: 'Plumbing' },
  { name: 'Electrical', price: 'From ₹249', icon: '⚡', category: 'Electrical' },
  { name: 'Cleaning', price: 'From ₹499', icon: '✨', category: 'Cleaning' },
  { name: 'AC Repair', price: 'From ₹399', icon: '❄️', category: 'AC Repair' },
];

export const TOP_PROFESSIONALS = [
  {
    name: 'Ramesh Kumar',
    role: 'Master Plumber',
    exp: '8 yrs exp',
    rating: '4.9 (340+)',
    avatar: SERVICES[0].pro.avatar,
  },
  {
    name: 'Suresh V.',
    role: 'Senior Electrician',
    exp: '6 yrs exp',
    rating: '4.8 (280+)',
    avatar: SERVICES[1].pro.avatar,
  },
];

export const BOOKING_DATES = ['Today, Oct 29', 'Tomorrow, Oct 30', 'Fri, Oct 31', 'Sat, Nov 01'];
export const TIME_SLOTS = ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM'];

export const SPLASH_HERO_IMAGE =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80';

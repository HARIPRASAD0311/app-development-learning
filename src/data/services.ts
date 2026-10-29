import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Tap & Pipe Leak Repair',
    category: 'Plumbing',
    rating: 4.9,
    reviewsCount: 342,
    startingPrice: 299,
    duration: '30-45 mins',
    icon: '🔧',
    image:
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    description:
      'Expert repair of leaking taps, pipe joints, flush tanks, and minor blockages. Includes thorough inspection.',
    included: [
      'Comprehensive leak inspection with pressure test',
      'Replacement of damaged washers/O-rings',
      'Pipe joint sealing & tightening',
      '30-day warranty on completed repair work',
    ],
    pro: {
      name: 'Ramesh Kumar',
      experience: '8 yrs exp',
      rating: 4.9,
      completedJobs: 1240,
      avatar:
        'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 's2',
    name: 'Switchboard & Socket Installation',
    category: 'Electrical',
    rating: 4.8,
    reviewsCount: 289,
    startingPrice: 249,
    duration: '30-60 mins',
    icon: '⚡',
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    description:
      'Safe installation and testing of power sockets, modular switches, MCBs, and decorative lighting.',
    included: [
      'Removal of old switch plates & damaged wiring',
      'Installation of heavy-duty modular switches',
      'Voltage testing & earthing verification',
      'Safety check for connected appliances',
    ],
    pro: {
      name: 'Suresh V.',
      experience: '6 yrs exp',
      rating: 4.8,
      completedJobs: 890,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 's3',
    name: 'Full Home Deep Cleaning',
    category: 'Cleaning',
    rating: 4.9,
    reviewsCount: 512,
    startingPrice: 1499,
    duration: '3-4 hrs',
    icon: '✨',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    description:
      'Intensive deep cleaning of all rooms, kitchen degreasing, bathroom sanitization, and floor scrubbing using medical-grade supplies.',
    included: [
      'Deep kitchen degreasing & appliance exterior polish',
      'Bathroom descaling & high-pressure sanitization',
      'Furniture vacuuming & floor mechanized scrubbing',
      'Balcony sweeping & window glass cleaning',
    ],
    pro: {
      name: 'Priya & Team',
      experience: '5 yrs exp',
      rating: 4.95,
      completedJobs: 1560,
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 's4',
    name: 'AC Servicing & Gas Top-up',
    category: 'AC Repair',
    rating: 4.85,
    reviewsCount: 420,
    startingPrice: 499,
    duration: '45-60 mins',
    icon: '❄️',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    description:
      'Foam jet wet servicing of indoor unit, outdoor condenser cleaning, filter washing, and gas pressure check.',
    included: [
      'High-pressure water jet cleaning of cooling coils',
      'Filter washing & anti-bacterial spray treatment',
      'Drain pipe flush & leakage prevention check',
      'Refrigerant gas pressure check & diagnostic report',
    ],
    pro: {
      name: 'Anand M.',
      experience: '7 yrs exp',
      rating: 4.88,
      completedJobs: 1100,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  },
];

export const getServiceById = (id: string): Service =>
  SERVICES.find((s) => s.id === id) ?? SERVICES[0];

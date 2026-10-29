import { Booking, BookingDraft } from '../types';

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HVN-88421',
    serviceId: 's1',
    serviceName: 'Tap & Pipe Leak Repair',
    category: 'Plumbing',
    status: 'Confirmed',
    statusStep: 2,
    date: 'Today, Oct 29',
    timeSlot: '02:00 PM - 03:00 PM',
    address: 'Flat 4B, Emerald Heights, Adyar, Chennai - 600020',
    price: 352,
    pro: {
      name: 'Ramesh Kumar',
      role: 'Master Plumber',
      phone: '+91 98765 43210',
      rating: 4.9,
      avatar:
        'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80',
    },
    issueNote: 'Main sink tap dripping continuously. Need quick gasket check.',
    createdAt: 'Oct 29, 2026, 11:30 AM',
  },
  {
    id: 'HVN-72109',
    serviceId: 's3',
    serviceName: 'Full Home Deep Cleaning',
    category: 'Cleaning',
    status: 'Completed',
    statusStep: 5,
    date: 'Oct 15, 2026',
    timeSlot: '10:00 AM - 02:00 PM',
    address: 'Flat 4B, Emerald Heights, Adyar, Chennai - 600020',
    price: 1553,
    pro: {
      name: 'Priya & Team',
      role: 'Cleaning Supervisor',
      phone: '+91 98765 11223',
      rating: 4.95,
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    issueNote: 'Focus on kitchen tiles and balcony dust clean.',
    createdAt: 'Oct 14, 2026, 04:15 PM',
  },
];

export const INITIAL_BOOKING_DRAFT: BookingDraft = {
  date: 'Today, Oct 29',
  timeSlot: '02:00 PM',
  address: 'Flat 4B, Emerald Heights, Adyar, Chennai',
  note: '',
};

export type ServiceCategory = 'Plumbing' | 'Electrical' | 'Cleaning' | 'AC Repair';

export interface Professional {
  name: string;
  rating: number;
  avatar: string;
  role?: string;
  phone?: string;
  experience?: string;
  completedJobs?: number;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  duration: string;
  icon: string;
  image: string;
  description: string;
  included: string[];
  pro: Professional;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  status: BookingStatus;
  /** 1: Placed, 2: Assigned, 3: On The Way, 4: In Progress, 5: Completed */
  statusStep: number;
  date: string;
  timeSlot: string;
  address: string;
  price: number;
  pro: Professional;
  issueNote: string;
  createdAt: string;
}

export interface BookingDraft {
  date: string;
  timeSlot: string;
  address: string;
  note: string;
}

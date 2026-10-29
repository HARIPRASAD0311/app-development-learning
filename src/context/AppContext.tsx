import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { INITIAL_BOOKING_DRAFT, INITIAL_BOOKINGS } from '../data/bookings';
import { Booking, BookingDraft, Service, ServiceCategory } from '../types';
import { addHours } from '../utils/time';

type Category = 'All' | ServiceCategory;

interface AppContextValue {
  bookings: Booking[];
  activeBooking: Booking;
  latestBooking: Booking | null;
  activeCategory: Category;
  bookingDraft: BookingDraft;
  setActiveCategory: (c: Category) => void;
  setActiveBookingId: (id: string) => void;
  setBookingDraft: (d: BookingDraft) => void;
  confirmBooking: (service: Service) => Booking;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBookingId, setActiveBookingId] = useState<string>('HVN-88421');
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(INITIAL_BOOKING_DRAFT);

  const activeBooking = useMemo(
    () => bookings.find((b) => b.id === activeBookingId) ?? bookings[0],
    [bookings, activeBookingId],
  );

  const confirmBooking = useCallback(
    (service: Service): Booking => {
      const id = `HVN-${Math.floor(10000 + Math.random() * 90000)}`;
      const taxes = Math.round(service.startingPrice * 0.18);
      const total = service.startingPrice + 49 + taxes;

      const booking: Booking = {
        id,
        serviceId: service.id,
        serviceName: service.name,
        category: service.category,
        status: 'Confirmed',
        statusStep: 2,
        date: bookingDraft.date,
        timeSlot: `${bookingDraft.timeSlot} - ${addHours(bookingDraft.timeSlot, 1)}`,
        address: bookingDraft.address,
        price: total,
        pro: service.pro,
        issueNote: bookingDraft.note || 'No special instructions provided.',
        createdAt: 'Just now',
      };

      setBookings((prev) => [booking, ...prev]);
      setLatestBooking(booking);
      setActiveBookingId(id);
      return booking;
    },
    [bookingDraft],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      bookings,
      activeBooking,
      latestBooking,
      activeCategory,
      bookingDraft,
      setActiveCategory,
      setActiveBookingId,
      setBookingDraft,
      confirmBooking,
    }),
    [bookings, activeBooking, latestBooking, activeCategory, bookingDraft, confirmBooking],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}

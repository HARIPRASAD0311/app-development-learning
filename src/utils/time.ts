/** Adds hours to a "hh:mm AM/PM" string, rolling AM/PM correctly (e.g. 11:30 AM + 1h -> 12:30 PM). */
export function addHours(timeStr: string, hrs: number): string {
  if (!timeStr) return '03:00 PM';
  const [clock, period] = timeStr.split(' ');
  const [h, m] = clock.split(':').map(Number);

  const hour24 = ((h % 12) + (period === 'PM' ? 12 : 0) + hrs) % 24;
  const newPeriod = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return `${String(hour12).padStart(2, '0')}:${String(m || 0).padStart(2, '0')} ${newPeriod}`;
}

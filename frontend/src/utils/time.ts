import { addMinutes, format } from 'date-fns';

export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'HH:MM');
};

export const getTimeArrival = (date: string, duration: number): string => {
  const departureDate = new Date(date);
  const arrivalDate = addMinutes(departureDate, duration);

  return formatTime(arrivalDate);
};

export const getFlightDurationInHours = (
  duration: number
): { hours: number; minutes: number } => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return { hours, minutes };
};

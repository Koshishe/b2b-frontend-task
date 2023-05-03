import { SortType } from '@/types/filters';
import type { Ticket } from '@/types/ticket';

export const quickTicketsSort = (
  tickets: Ticket[],
  left = 0,
  right = tickets.length - 1
) => {
  if (left >= right) return;
  const pivot = tickets[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (
      tickets[i].segments[0].duration + tickets[i].segments[1].duration <
      pivot.segments[0].duration + pivot.segments[1].duration
    )
      i++;
    while (
      tickets[j].segments[0].duration + tickets[j].segments[1].duration >
      pivot.segments[0].duration + pivot.segments[1].duration
    )
      j--;
    if (i <= j) {
      [tickets[i], tickets[j]] = [tickets[j], tickets[i]];
      i++;
      j--;
    }
  }
  quickTicketsSort(tickets, left, j);
  quickTicketsSort(tickets, i, right);
};

export const sortByStops = (
  allTickets: Ticket[],
  stops: number[]
): Ticket[] => {
  const checkMaxNumberOfStops = (maxStop: number) => (stopsCount: number) =>
    stopsCount <= maxStop;
  const checkValidNumberOfStops = (stops: number[]) => (stopsCount: number) =>
    stops.includes(stopsCount);

  const maxStop = Math.max(...stops);
  const isMaxNumberOfStops = checkMaxNumberOfStops(maxStop);
  const isValidNumberOfStops = checkValidNumberOfStops(stops);

  return allTickets.filter((ticket) => {
    const [firstSegment, secondSegment] = ticket.segments;
    const firstSegmentsStopsCount = firstSegment.stops.length;
    const secondSegmentsStopsCount = secondSegment.stops.length;

    return (
      isMaxNumberOfStops(firstSegmentsStopsCount) &&
      isMaxNumberOfStops(secondSegmentsStopsCount) &&
      (isValidNumberOfStops(firstSegmentsStopsCount) ||
        isValidNumberOfStops(secondSegmentsStopsCount))
    );
  });
};

export const sortByType = (
  tickets: Ticket[],
  filtersType: SortType
): Ticket[] => {
  const updatedTickets = [...tickets];

  switch (filtersType) {
    case SortType.cheapest:
      return updatedTickets.sort((a, b) => Math.sign(a.price - b.price));
    case SortType.fastest:
      quickTicketsSort(updatedTickets);
      return updatedTickets;
    default:
      return updatedTickets;
  }
};

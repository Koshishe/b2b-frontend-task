import { SortType } from '@/types/filters';
import type { Ticket } from '@/types/ticket';

import { quickTicketsSort, sortByStops, sortByType } from '../sort';
import { mockedTickets } from './specs';

describe('filterTicketsByStops', () => {
  const allTickets = mockedTickets;

  test('filters tickets based on the provided stops filter', () => {
    const stops = [2];
    const filteredTickets = sortByStops(allTickets, stops);

    expect(filteredTickets).toHaveLength(1);
  });

  test('returns all tickets when all stops filters are set', () => {
    const stops = [0, 1, 2, 3];
    const filteredTickets = sortByStops(allTickets, stops);

    expect(filteredTickets).toEqual(allTickets);
  });
});

describe('sortTickets', () => {
  const tickets = mockedTickets;

  test('sorts tickets by cheapest', () => {
    const sortedTickets: Ticket[] = sortByType(tickets, SortType.cheapest);

    expect(sortedTickets[0].price).toBeLessThanOrEqual(sortedTickets[1].price);
    expect(sortedTickets[1].price).toBeLessThanOrEqual(sortedTickets[2].price);
  });

  test('sorts tickets by fastest', () => {
    const sortedTickets = sortByType(tickets, SortType.fastest);

    const durationFirstTicket =
      sortedTickets[0].segments[0].duration +
      sortedTickets[0].segments[1].duration;
    const durationSecondTicket =
      sortedTickets[1].segments[0].duration +
      sortedTickets[1].segments[1].duration;
    const durationThirdTicket =
      sortedTickets[2].segments[0].duration +
      sortedTickets[2].segments[1].duration;

    expect(durationFirstTicket).toBeLessThanOrEqual(durationSecondTicket);
    expect(durationSecondTicket).toBeLessThanOrEqual(durationThirdTicket);
  });

  test('returns unsorted tickets for an empty filter type', () => {
    const sortedTickets = sortByType(tickets, '' as SortType);

    expect(sortedTickets).toEqual(tickets);
  });
});

describe('quickTicketsSort', () => {
  const tickets = mockedTickets;

  test('sort tickets by duration', () => {
    const sortedTickets = [...tickets];

    quickTicketsSort(sortedTickets);

    const isSortedByDuration = (tickets: Ticket[]): boolean => {
      for (let i = 1; i < tickets.length; i++) {
        const prevDuration =
          tickets[i - 1].segments[0].duration +
          tickets[i - 1].segments[1].duration;
        const currentDuration =
          tickets[i].segments[0].duration + tickets[i].segments[1].duration;

        if (prevDuration > currentDuration) {
          return false;
        }
      }
      return true;
    };

    expect(isSortedByDuration(sortedTickets)).toBe(true);
  });
});

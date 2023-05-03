import type { Ticket } from '@/types/ticket';

export const mockedTickets: Ticket[] = [
  {
    sign: 'd5e5ecf6-31f7-42af-9d29-f75f8c3e3e4c',
    price: 12500,
    carrier: 'S7',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2021-03-10T06:10:00.000Z',
        stops: ['HKG'],
        duration: 1325,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2021-03-24T23:25:00.000Z',
        stops: ['SHA', 'BKK', 'HKG'],
        duration: 1340,
      },
    ],
  },
  {
    sign: 'ec1f6d06-6af4-40e9-9d8a-0b5e43f5a5b5',
    price: 13750,
    carrier: 'SU',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2023-05-01T07:35:00.000Z',
        stops: ['DXB'],
        duration: 1200,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2023-05-15T19:10:00.000Z',
        stops: ['AUH', 'IST', 'DXB'],
        duration: 1400,
      },
    ],
  },
  {
    sign: '8b39bf2c-5c47-47e1-a04f-2a2402c117e2',
    price: 14500,
    carrier: 'EK',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2023-07-02T12:40:00.000Z',
        stops: ['DXB', 'BKK'],
        duration: 1350,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2023-07-16T04:50:00.000Z',
        stops: ['IST', 'DXB'],
        duration: 1360,
      },
    ],
  },
];

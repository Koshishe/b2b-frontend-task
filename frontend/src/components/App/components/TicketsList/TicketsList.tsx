import { useEffect, useState } from 'react';

import type { Ticket } from '@/types/ticket';
import { getWordDeclination, sliceList } from '@/utils/helpers';

import { TicketItem } from './components/TicketItem/TicketItem';
import s from './TicketsList.module.scss';

interface TicketsListProps {
  tickets: Ticket[];
}

const TICKETS_STEP = 5;

export const TicketsList = ({ tickets }: TicketsListProps) => {
  const [ticketsStepCount, setTicketsStepCount] = useState(TICKETS_STEP);
  const [slicedTicketsList, setSlicedTicketsList] = useState<Ticket[]>([]);

  const handleShowMore = () => {
    setTicketsStepCount(ticketsStepCount + TICKETS_STEP);
  };

  useEffect(() => {
    setSlicedTicketsList(sliceList(tickets, ticketsStepCount));
  }, [tickets, ticketsStepCount]);

  const remainingTickets = tickets.length - slicedTicketsList.length;

  const showMoreText = `Показать еще ${Math.min(
    remainingTickets,
    TICKETS_STEP
  )} ${getWordDeclination('билет', ['ов', '', 'а'], remainingTickets)}!`;

  return (
    <div>
      {slicedTicketsList.map((ticket) => (
        <TicketItem key={ticket.sign} ticket={ticket} />
      ))}
      {remainingTickets > 0 && (
        <button type="button" className={s.showMore} onClick={handleShowMore}>
          {showMoreText}
        </button>
      )}
    </div>
  );
};

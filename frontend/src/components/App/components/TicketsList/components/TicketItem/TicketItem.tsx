import type { Ticket } from '@/types/ticket';
import {
  getCarrierImageSrc,
  getPriceWithSpaces,
  getWordDeclination,
} from '@/utils/helpers';
import {
  formatTime,
  getFlightDurationInHours,
  getTimeArrival,
} from '@/utils/time';

import { TicketInfoBlock } from '../TicketInfoBlock/TicketInfoBlock';
import s from './TicketItem.module.scss';

interface TicketItemProps {
  ticket: Ticket;
}
export const TicketItem = ({ ticket }: TicketItemProps) => {
  const { price, carrier, segments } /*sign*/ = ticket;

  const getFlightTimes = (date: string, duration: number) => {
    // Время прибытия должно отображаться в часовом поясе места прибытия,
    // но для этого необходимо иметь соответствие IATA кода с часовым поясом.
    // Для упрощения в данном приложении используется один часовой пояс.
    return `${formatTime(date)} - ${getTimeArrival(date, duration)}`;
  };

  return (
    <div className={s.root}>
      <div className={s.head}>
        <div className={s.price}>{getPriceWithSpaces(price)} P</div>
        <div className={s.carrier}>
          <img src={getCarrierImageSrc(carrier)} alt={carrier} />
        </div>
      </div>
      <div className={s.segments}>
        {segments.map((segment) => {
          const { origin, destination, date, stops, duration } = segment;
          const { hours, minutes } = getFlightDurationInHours(duration);
          const transbordersText = getWordDeclination(
            'пересад',
            ['ок', 'ка', 'ки'],
            stops.length
          );

          return (
            <div key={`${origin}-${duration}`} className={s.segment}>
              <TicketInfoBlock
                title={`${origin} - ${destination}`}
                description={getFlightTimes(date, duration)}
              />
              <TicketInfoBlock
                title="В пути"
                description={`${hours}ч ${minutes ? `${minutes}м` : ''}`}
              />
              <TicketInfoBlock
                title={`${
                  stops.length ? stops.length : ' Без'
                } ${transbordersText}`}
                description={stops.join(', ')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

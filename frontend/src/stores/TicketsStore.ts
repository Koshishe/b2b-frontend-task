import { action, autorun, makeObservable, observable } from 'mobx';

import { b2bApi } from '@/api/api';
import type ErrorsModel from '@/stores/ErrorsStore';
import { SortType } from '@/types/filters';
import type { Ticket } from '@/types/ticket';
import { sortByStops, sortByType } from '@/utils/sort';

export default class TicketsModel {
  allTickets!: Ticket[];
  filteredTickets!: Ticket[];
  filters!: {
    allStops: number[];
    activeStops: number[];
    sortType: SortType;
  };
  errorsStore!: ErrorsModel;
  isPendingTickets!: boolean;
  updateError!: () => void;
  setFilterType!: (type: SortType) => void;
  setFilterStops!: (check: boolean, stopCount?: number) => void;
  addTickets!: (tickets: Ticket[]) => void;
}

export class TicketsStore implements TicketsModel {
  allTickets = [] as Ticket[];
  filteredTickets = [] as Ticket[];
  isPendingTickets = false;
  filters;
  errorsStore;
  updateError;

  constructor(errorsStore: ErrorsModel) {
    this.errorsStore = errorsStore;
    this.filters = {
      allStops: [] as number[],
      activeStops: [] as number[],
      sortType: SortType.cheapest,
    };

    makeObservable(this, {
      allTickets: observable,
      filteredTickets: observable,
      filters: observable,
      addTickets: action,
      setFilterType: action,
      setFilterStops: action,
    });

    autorun(() => {
      this.setIsPending(true);
      const client = new b2bApi();

      client.on(client.eventTickets, this.addTickets);
      client.on(client.eventFetching, this.setIsPending);
      client.on(client.eventError, this.errorsStore.setError);

      client.searchTickets();
    });

    this.updateError = autorun(() => {
      if (!this.filteredTickets.length && !this.isPendingTickets) {
        this.errorsStore.setError(
          'По вашему запросу ничего не найдено. Попробуйте расслабить фильтры.'
        );
      }
    });
  }

  addTickets = (tickets: Ticket[]) => {
    // Часто приходят билеты с одним и тем же ключом. Предполагаю, что подразумевается возможность
    // получения одного и того же билета от разных агрегаторов. Можно фильтровать, основываясь на бизнес требованиях,
    // к примеру, оставлять самый дешевый. Но в данном приложении билеты с одинаковым ключом полностью идентичны,
    // так что ограничилась фильтрацией только по ключу.
    this.allTickets = this.getUniqueTickets([...this.allTickets, ...tickets]);
    this.filteredTickets = this.allTickets;
    this.setAllStops();
    this.filterTicketsByStops();
    this.sortTicketsByType();
  };

  private getUniqueTickets = (tickets: Ticket[]): Ticket[] => {
    const uniqueTickets = new Set<string>();

    return tickets.filter((ticket) => {
      const key = ticket.sign;

      if (uniqueTickets.has(key)) {
        return false;
      } else {
        uniqueTickets.add(key);
        return true;
      }
    });
  };

  private setIsPending = (flag: boolean) => {
    this.isPendingTickets = flag;
  };

  private setAllStops = () => {
    this.allTickets.forEach((ticket) => {
      ticket.segments.forEach((segment) => {
        if (!this.filters.allStops.includes(segment.stops.length)) {
          this.filters.allStops.push(segment.stops.length);
        }
      });
    });

    this.filters.allStops = this.filters.allStops
      .slice()
      .sort((a, b) => Math.sign(a - b));
    this.setFilterStops(true);
  };

  private filterTicketsByStops = () => {
    this.errorsStore.setError('');

    const { activeStops } = this.filters;

    this.filteredTickets = sortByStops(this.allTickets, activeStops);
    this.sortTicketsByType();
  };

  private sortTicketsByType = () => {
    this.filteredTickets = sortByType(
      this.filteredTickets,
      this.filters.sortType
    );
  };

  setFilterStops = (check: boolean, stopCount?: number) => {
    const { activeStops } = this.filters;

    if (stopCount === undefined) {
      this.filters.activeStops = check ? this.filters.allStops : [];
      this.filterTicketsByStops();
      return;
    }
    this.filters.activeStops = check
      ? [...activeStops, stopCount]
      : activeStops.filter((filterItem) => filterItem !== stopCount);
    this.filterTicketsByStops();
  };

  setFilterType = (type: SortType) => {
    this.filters.sortType = type;
    this.sortTicketsByType();
  };
}

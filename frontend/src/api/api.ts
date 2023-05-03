import EventEmitter from 'events';
import debounce from 'lodash/debounce';

export class b2bApi extends EventEmitter {
  searchId = '';
  countRetry = 0;
  eventFetching = 'isFetching';
  eventTickets = 'tickets';
  eventError = 'error';

  constructor() {
    super();
  }

  async getSearchId() {
    try {
      const res = await fetch('/search');

      if (!res.ok) {
        this.emit(this.eventFetching, false);
        throw new Error(
          'Не удалось выполнить поиск. Пожалуйста, обновите страницу.'
        );
      }
      const data = await res.json();

      this.searchId = data.searchId;
    } catch (error) {
      this.emit(this.eventFetching, false);
      if (error instanceof Error) {
        this.emit(this.eventError, error.message);
      }
    }
  }

  getTicketsData() {
    const fetchData = debounce(async () => {
      try {
        const response = await fetch(`/tickets?searchId=${this.searchId}`);

        if (!response.ok) {
          throw new Error(
            'Не удалось получить все билеты. Пожалуйста, обновите страницу.'
          );
        }

        const data = await response.json();

        this.emit(this.eventTickets, data.tickets);
        this.countRetry = 0;

        if (!data.stop) {
          this.getTicketsData();
        } else {
          this.emit(this.eventFetching, false);
        }
      } catch (error) {
        if (this.countRetry === 2) {
          this.emit(this.eventFetching, false);

          if (error instanceof Error) {
            this.emit(this.eventError, error.message);
          }
        } else {
          this.countRetry += 1;
          this.getTicketsData();
        }
      }
    }, 1000);

    fetchData();
  }

  async searchTickets() {
    this.emit(this.eventFetching, true);
    if (!this.searchId) {
      await this.getSearchId();
    }
    if (this.searchId) {
      this.getTicketsData();
    }
  }
}

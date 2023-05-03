import type ErrorsModel from '@/stores/ErrorsStore';
import { ErrorsStore } from '@/stores/ErrorsStore';
import type TicketsModel from '@/stores/TicketsStore';
import { TicketsStore } from '@/stores/TicketsStore';

export class RootStore {
  ticketsStore: TicketsModel;
  errorsStore: ErrorsModel;

  constructor() {
    this.errorsStore = new ErrorsStore();
    this.ticketsStore = new TicketsStore(this.errorsStore);
  }
}

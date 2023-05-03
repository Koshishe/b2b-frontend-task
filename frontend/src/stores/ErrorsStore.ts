import { action, makeObservable, observable } from 'mobx';

export default class ErrorsModel {
  errorMessage!: string;
  setError!: (message: string) => void;
}

export class ErrorsStore implements ErrorsModel {
  errorMessage = '';

  constructor() {
    makeObservable(this, {
      errorMessage: observable,
      setError: action,
    });
  }

  setError = (message: string) => {
    this.errorMessage = message;
  };
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {
  private errorMessageSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSubject.asObservable();

  showError(message: string) {
    this.errorMessageSubject.next(message);
  }

  clearError() {
    this.errorMessageSubject.next('');
  }
}

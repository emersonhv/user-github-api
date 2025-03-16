import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorHandlerService } from '@services/error-handler.service';
import { Observable } from 'rxjs';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, ErrorMessageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'github-users-app';
  errorMessage$: Observable<string>;

  constructor(private errorHandler: ErrorHandlerService) {
    this.errorMessage$ = this.errorHandler.errorMessage$;
  }
}

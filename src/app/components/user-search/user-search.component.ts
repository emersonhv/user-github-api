import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GithubService } from '@services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '@services/error-handler.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private githubService: GithubService, private router: Router,
    private errorHandler: ErrorHandlerService) {
    this.searchForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.forbiddenUsernameValidator('doublevpartners'),
        ],
      ],
    });
  }

  forbiddenUsernameValidator(forbiddenName: string) {
    return (control: { value: string }) => {
      if (
        control.value &&
        control.value.toLowerCase() === forbiddenName.toLowerCase()
      ) {
        return { forbiddenName: true };
      }
      return null;
    };
  }

  onSearch() {
    if (this.searchForm.valid) {
      const username = this.searchForm.get('username')?.value;
      this.githubService.searchUsersObservable(username).subscribe({
        next: (response) => {
          console.log('Resultados de la búsqueda:', response);
          this.router.navigate(['/user', username]);
        },
        error: (error) => {
          this.errorHandler.showError('Error al buscar usuarios. Inténtalo de nuevo.');
        },
      });
    }
  }
}

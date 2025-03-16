import { Component, OnInit } from '@angular/core';
import { GithubService } from '@services/github.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const query = 'a';

      this.githubService.searchUsersObservable(query).subscribe({
        next: (response) => {
          this.users = response.items; // Obtiene los primeros 10 usuarios
        },
        error: (error) => {
          console.error('Error al buscar usuarios:', error);
        },
      });
    });
  }
}

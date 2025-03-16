import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '@services/github.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  user: any;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.githubService.getUserDetails(username).subscribe({
        next: (response) => {
          this.user = response; 
          this.isLoading = false; 
        },
        error: (error) => {
          this.error = 'Error al obtener detalles del usuario.'; 
          this.isLoading = false;
          console.error('Error al obtener detalles del usuario:', error);
        },
      });
    } else {
      this.error = 'Nombre de usuario no válido.'; 
      this.isLoading = false; 
    }
  }
}

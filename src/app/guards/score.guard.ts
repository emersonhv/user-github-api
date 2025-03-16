import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { GithubService } from '@services/github.service';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreGuard implements CanActivate {
  constructor(
    private githubService: GithubService,
    private router: Router 
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const username = route.paramMap.get('username'); 
    if (!username) {
      this.router.navigate(['/']); 
      return of(false);
    }

    return this.githubService.getUserDetails(username).pipe(
      map((user) => {
        console.log(user);
        if (user.score >= 30.0) {
          
          return true;
        } else {
          this.router.navigate(['/']); 
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']); 
        return of(false);
      })
    );
  }
}

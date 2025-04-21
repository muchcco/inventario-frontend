import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      // No hay token, permite ir al login
      return of(true);
    }

    // Si hay token, validar con el backend
    return this.authService.checkTokenValidity().pipe(
      map((isValid) => {
        if (isValid) {
          // Si es válido, redirige al dashboard
          this.router.navigate(['/']);
          return false;
        }
        // Si no es válido, permite quedarse en login
        return true;
      }),
      catchError(() => {
        // Si hay error validando, también permite quedarse en login
        return of(true);
      })
    );
  }
}

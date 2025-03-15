import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Opción: Clonar la solicitud y agregar el token si existe
    const token = localStorage.getItem('token');
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si se recibe un error 401 (no autorizado) o 403 (prohibido)
        if (error.status === 401 || error.status === 403) {
          // Borra el token (opcional) y redirige al login
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

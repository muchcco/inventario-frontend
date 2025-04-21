import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';

interface LoginResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ajusta esta URL según la ruta real en tu backend
  private baseUrl  = environment.apiUrl;
  // private baseUrl  = 'http://127.0.0.1:8000/api/login';


  constructor(private http: HttpClient) {}

  checkTokenValidity(): Observable<boolean> {
    return this.http.get<{ user: any }>(`${this.baseUrl }/user-profile`)
      .pipe(
        map(response => true),  // Si la respuesta es correcta, el token es válido
        catchError(error => of(false)) // En caso de error, devuelve false
      );
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl }/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}


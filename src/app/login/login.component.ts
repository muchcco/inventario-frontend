// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Guarda el token (por ejemplo, en localStorage)
        localStorage.setItem('token', response.token);
        // Redirige al dashboard
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        // Extraer el mensaje de error de la respuesta, dependiendo de cómo lo envíe el backend.
        let message = 'Credenciales inválidas, por favor intenta de nuevo.';
        if (err.error) {
          if (err.error.message) {
            message = err.error.message;
          } else if (typeof err.error === 'string') {
            message = err.error;
          }
          // Puedes incluir más condiciones si tu backend envía el error en otro formato.
        }
        this.errorMessage = message;
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

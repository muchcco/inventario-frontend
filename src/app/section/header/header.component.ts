import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();  
  @Input() title: string = 'Dashboard';
  faUser = faUser;
  
  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token'); // 🔐 elimina el token
        this.router.navigate(['/login']); // 🔁 redirige al login
      },
      error: (err) => {
        console.error('Error cerrando sesión:', err);
      }
    });
  }
}
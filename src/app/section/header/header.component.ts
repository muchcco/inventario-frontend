import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  faUser = faUser;

  @Input() title: string = 'Dashboard';

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  logout() {
    alert('Sesión cerrada');
    // Aquí puedes redirigir al login
  }
}
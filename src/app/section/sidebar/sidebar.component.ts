import { Component, Input } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;

  faHouse = faHouse;
}
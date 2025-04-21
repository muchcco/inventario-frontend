import { ChangeDetectorRef, AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isCollapsed: boolean = false;
  headerTitle: string = 'Dashboard';
  sidebarCollapsed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Fuerza la detección de cambios
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  handleToggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

   // Se invoca cada vez que se activa un componente en el router-outlet.
   onActivate(componentRef: any): void {
    // Si el componente activado define una propiedad "pageTitle", se actualiza el título.
    if (componentRef.pageTitle) {
      this.headerTitle = componentRef.pageTitle;
    } else {
      this.headerTitle = 'Dashboard';
    }
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pageTitle: string = 'Panel Principal';
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    // Simula una carga de datos de 1 segundo
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from './auth/auth.guard'; // Asumiendo que tienes un AuthGuard
import { LayoutComponent } from './section/layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' },
  // Rutas protegidas dentro del layout:
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Puedes agregar otras rutas hijas aquí
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // Ruta comodín para redirigir a la raíz en caso de rutas desconocidas
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

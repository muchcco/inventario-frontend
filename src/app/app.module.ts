import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BienesComponent } from './pages/almacen/bienes/bienes.component';
import { LayoutComponent } from './section/layout/layout.component';
import { HeaderComponent } from './section/header/header.component';
import { SidebarComponent } from './section/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './section/footer/footer.component';
import { SessionService } from './services/session.service';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BienesComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
import { SpinnerComponent } from './pages/shared/components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ProductoComponent } from './pages/almacen/producto/producto.component';
import { ModalProductoComponent } from './pages/almacen/producto/modal/modal-producto/modal-producto.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductoComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    SpinnerComponent,    
    ModalProductoComponent        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MomentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

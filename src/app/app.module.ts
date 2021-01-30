import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BooksRoutingModule } from './modules/books/books-routing.module';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { ApiService } from './services/api/api.service';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { PreloaderComponent } from './components/preloader/preloader/preloader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    AuthRoutingModule,
    BooksRoutingModule,
    UserRoutingModule,
    SharedModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule
  ],
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

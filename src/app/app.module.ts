import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideRoutes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {ROUTES} from './app.routes';
import { HomeComponent } from './home/home.component';
import { SharedUser } from './service/sharedUserService';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [SharedUser],
  bootstrap: [AppComponent]
})
export class AppModule { }


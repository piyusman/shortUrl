import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


export const ROUTES: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'login' },
{ path: 'login', component: LoginComponent },
{ path: 'home', component: HomeComponent }
]

import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Map } from './pages/map/map';
import { Messages } from './pages/messages/messages';
import { Observation } from './pages/observation/observation';
import { Whatshere } from './pages/whatshere/whatshere';
import { AdminLogin } from './pages/admin-login/admin-login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'about', component: About, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'map', component: Map, canActivate: [authGuard] },
    { path: 'messages', component: Messages, canActivate: [authGuard] },    
    { path: 'observation', component: Observation, canActivate: [authGuard] },
    { path: 'whatshere', component: Whatshere, canActivate: [authGuard] },
    { path: 'admin-login', component: AdminLogin },
    { path: 'register', component: Register },
];

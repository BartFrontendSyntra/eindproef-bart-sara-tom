import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Map } from './pages/map/map';
import { Messages } from './pages/messages/messages';
import { Observation } from './pages/observation/observation';
import { Whatshere } from './pages/whatshere/whatshere';
import { AdminLogin } from './pages/admin-login/admin-login';
import { authGuardGuard } from './auth-guard-guard';


export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full', canActivate: [authGuardGuard] },
    { path: 'about', component: About, canActivate: [authGuardGuard] },
    { path: 'login', component: Login },
    { path: 'map', component: Map, canActivate: [authGuardGuard] },
    { path: 'messages', component: Messages, canActivate: [authGuardGuard] },    
    { path: 'observation', component: Observation, canActivate: [authGuardGuard] },
    { path: 'whatshere', component: Whatshere, canActivate: [authGuardGuard] },
    { path: 'admin-login', component: AdminLogin, canActivate: [authGuardGuard] },
];

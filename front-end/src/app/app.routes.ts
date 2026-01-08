import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Map } from './pages/map/map';
import { Messages } from './pages/messages/messages';
import { Observation } from './pages/observation/observation';
import { Whatshere } from './pages/whatshere/whatshere';
import { AdminLogin } from './pages/admin-login/admin-login';


export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: 'map', component: Map },
    { path: 'messages', component: Messages },    
    { path: 'observation', component: Observation },
    { path: 'whatshere', component: Whatshere },
    { path: 'admin-login', component: AdminLogin },
];

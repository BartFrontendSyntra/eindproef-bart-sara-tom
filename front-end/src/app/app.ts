import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Navbar  ],
  templateUrl: `./app.html`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
  authService = inject(AuthenticationService);

  showNavbar = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = event.urlAfterRedirects !== '/';
      });
  }
  
}

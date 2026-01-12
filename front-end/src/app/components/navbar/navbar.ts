import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  
  authService = inject(AuthenticationService);
  router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

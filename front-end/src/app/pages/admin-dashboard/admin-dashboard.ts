import { Component, signal, inject } from '@angular/core';
import { LocationsAdminComponent } from "../../components/locations-admin-component/locations-admin-component";
import { UsersAdminComponent } from "../../components/users-admin-component/users-admin-component";
import { ObservationsAdminComponent } from "../../components/observations-admin-component/observations-admin-component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';

const SECTIONS = ['users', 'locations', 'observations'] as const;
type Section = typeof SECTIONS[number];

@Component({
  selector: 'app-admin-dashboard',
  imports: [LocationsAdminComponent, UsersAdminComponent, ObservationsAdminComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  readonly sections = SECTIONS;
  activeSection = signal<Section>('users');
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  setActiveSection(section: Section) {
    this.activeSection.set(section);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
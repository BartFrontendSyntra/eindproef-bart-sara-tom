import { Component, signal } from '@angular/core';
import { LocationsAdminComponent } from "../../components/locations-admin-component/locations-admin-component";
import { UsersAdminComponent } from "../../components/users-admin-component/users-admin-component";
import { ObservationsAdminComponent } from "../../components/observations-admin-component/observations-admin-component";

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

  setActiveSection(section: Section) {
    this.activeSection.set(section);
  }
}
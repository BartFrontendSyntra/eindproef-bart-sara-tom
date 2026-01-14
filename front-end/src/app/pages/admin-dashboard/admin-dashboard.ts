import { Component } from '@angular/core';
import { LocationsAdminComponent } from "../../components/locations-admin-component/locations-admin-component";
import { UsersAdminComponent } from "../../components/users-admin-component/users-admin-component";
import { ObservationsAdminComponent } from "../../components/observations-admin-component/observations-admin-component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [LocationsAdminComponent, UsersAdminComponent, ObservationsAdminComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

}

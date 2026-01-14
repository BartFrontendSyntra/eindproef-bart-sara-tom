import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { RangerDashboard } from "../../components/ranger-dashboard/ranger-dashboard";

@Component({
  selector: 'app-home',
  imports: [RouterLink, RangerDashboard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  authenticationService: AuthenticationService = inject(AuthenticationService);

}

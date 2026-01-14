import { Component } from '@angular/core';
import { ObservationList } from "../observation-list/observation-list";
import { RangerLocationSubscription } from "../ranger-location-subscription/ranger-location-subscription";

@Component({
  selector: 'app-ranger-dashboard',
  imports: [ObservationList, RangerLocationSubscription],
  templateUrl: './ranger-dashboard.html',
  styleUrl: './ranger-dashboard.css',
})
export class RangerDashboard {

}

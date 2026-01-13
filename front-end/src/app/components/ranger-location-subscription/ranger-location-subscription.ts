import { Component, inject, signal } from '@angular/core';
import { RangerLocationService } from '../../services/ranger-location-service';
import { Location, LocationService } from '../../services/location-service';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-ranger-location-subscription',
  imports: [FormField],
  templateUrl: './ranger-location-subscription.html',
  styleUrl: './ranger-location-subscription.css',
})
export class RangerLocationSubscription {

  rangerLocationService: RangerLocationService = inject(RangerLocationService);
  locationService: LocationService = inject(LocationService);
  
  locations = signal<Location[]>([]);

  locationModel = signal({
    location_id: ''
  });
  locationForm = form(this.locationModel);

  ngOnInit() {
    this.loadLocations();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.rangerLocationService.subscribeToLocation(this.locationModel().location_id)
      .then(() => {
        alert('Successfully subscribed to location updates.');
      })
      .catch((error) => {
        console.error('Subscription error:', error);
        alert('Failed to subscribe to location updates.');
      });
  }
  async loadLocations() {
    try {
       this.locations.set(await this.locationService.getLocations());
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  }

}

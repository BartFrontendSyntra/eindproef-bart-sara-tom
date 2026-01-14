import { Component,inject,signal } from '@angular/core';
import { form, required, Field, FormField } from '@angular/forms/signals';
import { GeoLocationService } from '../../services/geo-location-service';
import { ObservationService } from '../../services/observation-service';
import { ObservationList } from "../../components/observation-list/observation-list";
import { LocationService, Location } from '../../services/location-service';


@Component({
  selector: 'app-observation',
  imports: [ FormField],
  templateUrl: './observation.html',
  styleUrl: './observation.css',
})
export class Observation {

  // Inject services
  geoLocationService: GeoLocationService = inject(GeoLocationService);
  observationService: ObservationService = inject(ObservationService);
  locationService: LocationService = inject(LocationService);

  // Signals
  observationModel = signal<ObservationData>({
    observation_text: '',
    longitude: 0,
    latitude: 0,
    photo_url: '',
    location_id: "0"
  });
  locations = signal<Location[]>([]);

  // Form definition
  observationForm = form(this.observationModel, schemaPath => {
    required(schemaPath.observation_text, { message: 'Observation text is required' });
    required(schemaPath.location_id, { message: 'Please select a location' });
  });


  ngOnInit() {
    this.loadLocations();
    this.fetchGeoLocation();
  }

  async fetchGeoLocation() {
    try {
      const position = await this.geoLocationService.getCurrentLocation();
      this.observationModel.update(current => ({
        ...current,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    } catch (err) {
      console.error('Error getting location', err);
      alert('Could not get location. Please enable GPS.');
    }
  }

  async loadLocations() {
    try {
       this.locations.set(await this.locationService.getLocations());
      console.log('Fetched locations', this.locations());
      return this.locations();
    } catch (err) {
      console.error('Error fetching locations', err);
      return [];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const observationData = this.observationModel();
    this.observationService.postObservation(observationData)
      .then(response => {
        alert('Observation submitted successfully!');
        this.observationModel.set({
          observation_text: '',
          longitude: 0,
          latitude: 0,
          photo_url: '',
          location_id: "0"
        });
        this.fetchGeoLocation();
      })
      .catch(error => {
        console.error('Error posting observation', error);
        alert('Failed to submit observation. Please try again.');
      });
      

  }

}

interface ObservationData {
    observation_text: string;
    longitude: number;
    latitude: number;
    photo_url: string;
    location_id: string;
    location_name?: string;
}
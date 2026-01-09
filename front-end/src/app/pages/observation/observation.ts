import { Component,inject,signal } from '@angular/core';
import { form, required, Field } from '@angular/forms/signals';
import { LocationService } from '../../services/location-service';
import { ObservationService } from '../../services/observation-service';
import { ObservationList } from "../../components/observation-list/observation-list";

@Component({
  selector: 'app-observation',
  imports: [Field, ObservationList],
  templateUrl: './observation.html',
  styleUrl: './observation.css',
})
export class Observation {

  locationService: LocationService = inject(LocationService);
  observationService: ObservationService = inject(ObservationService);

  observationModel = signal<ObservationData>({
    observation_text: '',
    longitude: 0,
    latitude: 0,
    photo_url: '',
  });

  observationForm = form(this.observationModel, schemaPath => {
    required(schemaPath.observation_text, { message: 'Observation text is required' });
  });


  ngOnInit() {
    this.fetchLocation();
  }

  async fetchLocation() {
    try {
      const position = await this.locationService.getCurrentLocation();
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


  onSubmit(event: Event) {
    event.preventDefault();
    const observationData = this.observationModel();
    this.observationService.postObservation(observationData)
      .then(response => {
        console.log('Observation posted successfully', response);
        alert('Observation submitted successfully!');
        this.observationModel.set({
          observation_text: '',
          longitude: 0,
          latitude: 0,
          photo_url: '',
        });
        this.fetchLocation();
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
}
import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ObservationService } from '../../services/observation-service';


@Component({
  selector: 'app-observation-list',
  imports: [DatePipe],
  templateUrl: './observation-list.html',
  styleUrl: './observation-list.css',
})
export class ObservationList {

  observationService = inject(ObservationService);
  observations = signal<Observation[]>([]);

  ngOnInit() {
    this.loadObservations();
  }

  loadObservations() {
    this.observationService.getObservations()
      .then((data) => {
        this.observations.set(data);
      })
      .catch((error) => {
        console.error('Error loading observations:', error);
      });
  }

}

interface Observation {
  username?: string;
  userEmail?: string;
  createdAt?: string;
  observation_text: string;
  longitude: number;
  latitude: number;
  photo_url: string;
}
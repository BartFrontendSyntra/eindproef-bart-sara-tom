import { Component, inject, signal } from '@angular/core';
import { Observation, ObservationService } from '../../services/observation-service';
import { LocationService } from '../../services/location-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-observations-admin-component',
  imports: [],
  templateUrl: './observations-admin-component.html',
  styleUrl: './observations-admin-component.css',
})
export class ObservationsAdminComponent {

  observationService = inject(ObservationService);

  observations = signal<Observation[]>([]);
  
  tempInput: string = '';


  ngOnInit() {
    this.loadObservations();
  }
  async loadObservations() {
    this.observationService.getObservations()
    .then(obs => {console.log(obs)
                  return obs;
    } )
    .then(obs => this.observations.set(obs))
    .catch(error => console.error('Error loading observations:', error)); 
  }

}

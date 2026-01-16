import { Component, inject, signal } from '@angular/core';
import { Observation, ObservationService } from '../../services/observation-service';
import { LocationService, Location } from '../../services/location-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-observations-admin-component',
  imports: [FormsModule],
  templateUrl: './observations-admin-component.html',
  styleUrl: './observations-admin-component.css',
})
export class ObservationsAdminComponent {

  observationService = inject(ObservationService);
  locationService = inject(LocationService);
  observations = signal<Observation[]>([]);
  locations = signal<Location[]>([]);

  // can later be replaced with a service call to get possible statuses
  statuses = signal<string[]>(["verified", "pending", "flagged"]);
  // Track which observation is being edited
  editingId = signal<number | null>(null);
  // Temporary model for editing
  tempEditModel = signal<Observation | null>(null);


  ngOnInit() {
    this.loadObservations();
    this.loadLocations();
  }

  async loadLocations() {
    this.locationService.getLocations()
    .then(locs => this.locations.set(locs))
    .catch(error => console.error('Error loading locations:', error)); 
  }

  async loadObservations() {
    this.observationService.getObservations()
    .then(obs => this.observations.set(obs))
    .catch(error => console.error('Error loading observations:', error)); 
  }

  startEdit(id: number) {
    this.editingId.set(id);
    const observation = this.observations().find(obs => obs.id === id);
    if (observation) {
      this.tempEditModel.set({ ...observation });
    }
  }

  cancelEdit() {
    this.editingId.set(null);
    this.tempEditModel.set(null);
  }

  updateObservation(id: number, observation: Observation) {
   const updatedData = this.tempEditModel();
    if (!updatedData) return;

    // Send updatedData to your API service
    this.observationService.updateObservation(id, updatedData).catch(error => {
      console.error('Error updating observation:', error);
      return;
    });

    // On success, update the main signal list locally:
    this.observations.update(list => 
      list.map(obs => obs.id === updatedData.id ? updatedData : obs)
    );

    // Close the edit mode
    this.tempEditModel.set(null);
    this.editingId.set(null);
  }

  


}

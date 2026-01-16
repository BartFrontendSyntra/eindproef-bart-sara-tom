import { Component, inject, signal } from '@angular/core';
import { LocationService, Location } from '../../services/location-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locations-admin-component',
  imports: [FormsModule],
  templateUrl: './locations-admin-component.html',
  styleUrl: './locations-admin-component.css',
})
export class LocationsAdminComponent {
  locationService = inject(LocationService);

  locations = signal<Location[]>([]);
  editingId = signal<number | null>(null);
  tempEditModel = signal<Location | null>(null);

  ngOnInit() {
    this.loadLocations();
  }

  async loadLocations() {
    this.locationService.getLocations()
    .then(locs => this.locations.set(locs))
    .catch(error => console.error('Error loading locations:', error)); 
  }


  startEdit(id: number) {
      this.editingId.set(id);
      const location = this.locations().find(loc => loc.id === id);
      if (location) {
        this.tempEditModel.set({ ...location });
      }
    }
  
    cancelEdit() {
      this.editingId.set(null);
      this.tempEditModel.set(null);
    }
  
    updateObservation(id: number, location: Location) {
     const updatedData = this.tempEditModel();
      if (!updatedData) return;
  
      // Send updatedData to your API service
      this.locationService.updateLocation(id, updatedData)
      .catch(error => {
        console.error('Error updating location:', error);
        return;
      });
  
      // On success, update the main signal list locally:
      this.locations.update(list => 
        list.map(loc => loc.id === updatedData.id ? updatedData : loc)
      );
  
      // Close the edit mode
      this.tempEditModel.set(null);
      this.editingId.set(null);
    }

}

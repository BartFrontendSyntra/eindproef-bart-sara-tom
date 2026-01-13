import { AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { Observation, ObservationService } from '../../services/observation-service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit{

  observations = signal<Observation[]>([]);
  private map!: L.Map;
  observationService = inject(ObservationService)
  private markerLayer = L.layerGroup();

  
  constructor() { 
    effect(() => {
    const data = this.observations();
    if (data.length > 0 && this.map) {
      this.addMarkers();
    }
  });
  }

  ngAfterViewInit(): void {
    this.fixMarkers();
    this.initMap();
    this.fetchObservations();
  }


initMap(): void {
  // 1. Initialize map centered on a default location
  // default location set to SyntraPxl campus Genk
  // zoom level 18 for a closer view
    this.map = L.map('map').setView([50.997012, 5.53671], 18);

    // 2. Add the OpenStreetMap tile layer
    // Maxzoom set to 19 to protect users from zooming in to far
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.markerLayer.addTo(this.map);
}

fetchObservations(): void {
  // Fetch observations from the service and update the signal
    this.observationService.getObservations().then((data) => {
      this.observations.set(data);
    });
}

addMarkers(): void {  

  this.markerLayer.clearLayers(); // Clear old markers
  this.observations().forEach(obs => {
    const marker = L.marker([obs.latitude, obs.longitude]);
    marker.bindPopup(`<b>Observation by:</b> ${obs.username}`);
    this.markerLayer.addLayer(marker);
  });
}

fixMarkers(): void {
  const iconRetinaUrl = '/assets/marker-icon-2x.png';
  const iconUrl = '/assets/marker-icon.png';
  const shadowUrl = '/assets/marker-shadow.png';
  const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;}
}

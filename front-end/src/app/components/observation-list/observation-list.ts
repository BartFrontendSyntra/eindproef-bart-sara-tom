import { DatePipe } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { ObservationService } from '../../services/observation-service';

@Component({
  selector: 'app-observation-list',
  imports: [DatePipe],
  templateUrl: './observation-list.html',
  styleUrl: './observation-list.css',
})
export class ObservationList implements OnInit {
  observationService = inject(ObservationService);
  observations = signal<Observation[]>([]);

  ngOnInit() {
    this.loadObservations();
  }

  loadObservations() {
    this.observationService
      .getObservations()
      .then((data) => {
        this.observations.set(
          data.sort(sortByStatusAndDateCreated)
        );
      })
      .catch((error) => {
        console.error('Error loading observations:', error);
      });

    function sortByStatusAndDateCreated(a: Observation, b: Observation): number {
      // Sort by Status
      const statusA = a.status ?? '';
      const statusB = b.status ?? '';
      const statusComparison = statusA.localeCompare(statusB);

      // If statuses are different, return the status sort result
      if (statusComparison !== 0) {
        return statusComparison;
      }

      // If statuses are the same, sort by created_at (Date)
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

      return dateB - dateA; // Newest first. Use (dateA - dateB) for Oldest first.
    }
  }
}

interface Observation {
  username?: string;
  userEmail?: string;
  created_at?: string;
  observation_text: string;
  longitude: number;
  latitude: number;
  photo_url: string;
  location_name?: string;
  status?: string;
}

import { Component, inject, signal, OnInit,viewChild, ElementRef, effect } from '@angular/core';
import { ObservationService, Observation } from '../../services/observation-service';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-observation-list',
  imports: [],
  templateUrl: './observation-list.html',
  styleUrl: './observation-list.css',
})
export class ObservationList implements OnInit {
  observationService = inject(ObservationService);
  authService = inject(AuthenticationService);
  observations = signal<Observation[]>([]);

  activeObservation = signal<Observation | null>(null);
  // Get the dialog reference
  private dialogRef = viewChild<ElementRef<HTMLDialogElement>>('obsDialog');

  constructor() {
    effect(() => {
      const el = this.dialogRef()?.nativeElement;
      if (this.activeObservation()) {
        el?.showModal();
      } else {
        el?.close();
      }
    });
  }

  ngOnInit() {
    this.loadObservations();
  }

  loadObservations() {
    this.observationService
      .getObservations()
      .then((data) => {
        this.observations.set(data.sort(sortByStatusAndDateCreated));
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

  close() {
    this.activeObservation.set(null);
  }
  
  getStatusBadgeClass(status?: string) {
    const statusCase = status?.toLowerCase();
    switch(statusCase) {
      case 'verified':
        return 'bg-success';
      case 'flagged':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  }

  verifyObservation(id: number) {
    this.observationService
      .updateObservation(id, { status: 'verified' })
      .then(() => {
        this.loadObservations();
        this.close();
      })
      .catch((error) => {
        console.error('Error verifying observation:', error);
      });
  }

  flagObservation(id: number) {
    this.observationService
      .updateObservation(id, { status: 'flagged' })
      .then(() => {
        this.loadObservations();
        this.close();
      })
      .catch((error) => {
        console.error('Error flagging observation:', error);
      });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  canModifyStatus(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Ranger' || role === 'Admin';
  }

}

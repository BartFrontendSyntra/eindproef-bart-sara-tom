import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'http://localhost:8000/api/locations';

  getLocations(): Promise<Location[]> {
          return fetch(this.apiUrl, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
              },
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Failed to fetch observations');
              }
              return response.json();
          });
      }
}

export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}
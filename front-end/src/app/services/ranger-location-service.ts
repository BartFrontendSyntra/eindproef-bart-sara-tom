import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RangerLocationService {
  private apiUrl = 'http://localhost:8000/api/locations/{id}/subscribe';


  subscribeToLocation(locationId: string): Promise<any> {
      const url = this.apiUrl.replace('{id}', locationId);
      return fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
          },
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Failed to subscribe to location');
          }
          return response.json();
      });
  }

}

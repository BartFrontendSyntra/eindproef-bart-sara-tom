import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObservationService {
    private apiUrl = 'http://localhost:8000/api/observations';


    postObservation(observation: Observation): Promise<any> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
            },
            body: JSON.stringify(observation),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to post observation');
            }
            return response.json();
        });
    }

    getObservations(): Promise<Observation[]> {
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
export interface Observation {
    username?: string;
    userEmail?: string;
    created_at?: string;
    observation_text: string;
    longitude: number;
    latitude: number;
    photo_url: string;
}
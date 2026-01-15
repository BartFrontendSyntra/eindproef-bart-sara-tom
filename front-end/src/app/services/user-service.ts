import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users';
  
  getUsers(): Promise<User[]> {
          return fetch(this.apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
              },
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Failed to fetch users');
              }
              return response.json();
          });
  }

  updateUser(id: number, data: Partial<User>): Promise<User> {
      return fetch(`${this.apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
          },
          body: JSON.stringify(data)
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Failed to update user');
          }
          return response.json();
      });
  }
}
export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    created_at: string;
}
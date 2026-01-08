import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  private apiUrl = 'http://localhost:8000/api/login';

  

  login(user: User): Promise<string> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user.username, password: user.password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }        
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem('auth_token', data.token);
        return data;
      });
  }

  logout(): void {
    sessionStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('auth_token') !== null;
  }


}
interface User {
    username: string;
    password: string;
  }
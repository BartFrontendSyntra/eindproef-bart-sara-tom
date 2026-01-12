import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  private apiUrl = 'http://localhost:8000/api/login';
  private registerUrl = 'http://localhost:8000/api/register';
  

  login(user: User): Promise<string> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: user.username, 
        password: user.password, 
        requiredRole: user.requiredRole}),
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

  register(user: RegisterUser): Promise<string> {
    return fetch(this.registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirmation
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Registration failed');
          });
        }
        return response.json();
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
    requiredRole: string;
  }

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
import { Component, inject, signal } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { form, required, Field } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

authenticationService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  loginModel = signal<Credentials>({
    username: '',
    password: '',
    requiredRole: 'Admin',
  });

  loginForm = form(this.loginModel, schemaPath => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
   
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
    // e.g., await this.authenticationService.login(credentials);
    this.authenticationService
      .login(credentials)
      .then(data => {
        console.log('Login successful, token:', data);
        const redirectUrl =
          sessionStorage.getItem('redirect_after_login') || '/';
        sessionStorage.removeItem('redirect_after_login');
        this.router.navigate([redirectUrl]);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  }

}
interface Credentials {
  username: string;
  password: string;
  requiredRole: string;
}

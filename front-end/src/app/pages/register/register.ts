import { Component, inject, signal } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { form, required, Field } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Field, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})


export class Register {

authenticationService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  registerModel = signal<RegCredentials>({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    requiredRole: 'Visitor',
  });

  registerForm = form(this.registerModel, schemaPath => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.email, { message: 'E-mail is required' });
    required(schemaPath.password, { message: 'Password is required' });
    required(schemaPath.password_confirmation, { message: 'Confirm password' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
   
    const regCredentials = this.registerModel();
    console.log('Registering:', regCredentials);

    this.authenticationService
      .register(regCredentials)
      .then(() => {
        const loginCredentials = {
          username: regCredentials.username,
          password: regCredentials.password,
          requiredRole: regCredentials.requiredRole
        };
        console.log('Logging in with:', loginCredentials);
        return this.authenticationService.login(loginCredentials);
      })
      .then(token => {
        console.log('Registration and login successful, token:', token);
        const redirectUrl =
          sessionStorage.getItem('redirect_after_login') || '/';
        sessionStorage.removeItem('redirect_after_login');
        this.router.navigate([redirectUrl]); 
      })
      .catch(error => {
        console.error('Registration or login failed:', error);
      });
  }

}
interface RegCredentials {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  requiredRole: string;
}
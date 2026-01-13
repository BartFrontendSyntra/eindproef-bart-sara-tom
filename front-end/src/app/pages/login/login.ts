import { Component, inject, signal } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { form, required, Field } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [Field, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

authenticationService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  loginModel = signal<Credentials>({
    username: '',
    password: ''
  });

  loginForm = form(this.loginModel, schemaPath => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  showToast = signal(false);
  toastMessage = signal('');
  showModal = signal(false);
  modalMessage = signal('');

  onSubmit(event: Event) {
    event.preventDefault();
   
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);

    this.authenticationService
      .login(credentials)
      .then(data => {
        console.log('Login successful, token:', data);
        const redirectUrl =
          sessionStorage.getItem('redirect_after_login') || '/';
        sessionStorage.removeItem('redirect_after_login');
        this.router.navigate([redirectUrl]);
      })
      .catch((error: any) => {
        console.error(error);
        if (error.message === 'Login failed') {
          this.toastMessage.set('Wrong username or password.');
          this.showToast.set(true);
          setTimeout (() => this.showToast.set(false), 3000);
        } else {
          this.modalMessage.set('Server error.');
          this.showModal.set(true)
        }
      });
  }

  closeModal() {
    this.showModal.set(false);
  }

}
interface Credentials {
  username: string;
  password: string;
}

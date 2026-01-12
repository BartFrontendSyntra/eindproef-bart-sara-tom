import { Component, inject, signal } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { form, required, Field } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Field],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

// export class Register {

//   user = {
//     username: '',
//     email: '',
//     password: '',
//     passwordConfirmation: ''
//   };

//   error = '';
//   success = '';

//   constructor(private authService: AuthenticationService) {}

//   onSubmit() {
//     this.authService.register(this.user)
//       .then(res => {
//         this.success = res.message;
//         this.error = '';
//         this.user = { username: '', email: '', password: '', passwordConfirmation: '' };
//       })
//       .catch(err => {
//         this.error = err.message;
//         this.success = '';
//       });
//   }
// }
//
// version by chatgpt above


export class Register {

authenticationService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  registerModel = signal<Credentials>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    requiredRole: 'Visitor',
  });

  registerForm = form(this.registerModel, schemaPath => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.email, { message: 'E-mail is required' });
    required(schemaPath.password, { message: 'Password is required' });
    required(schemaPath.passwordConfirmation, { message: 'Confirm password' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
   
    const credentials = this.registerModel();
    console.log('Registering:', credentials);
    // e.g., await this.authenticationService.login(credentials);
    this.authenticationService
      .login(credentials)
      .then(data => {
        console.log('Registration successful, token:', data);
        const redirectUrl = '/';
          this.router.navigate([redirectUrl]);
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  }

}
interface Credentials {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  requiredRole: string;
}
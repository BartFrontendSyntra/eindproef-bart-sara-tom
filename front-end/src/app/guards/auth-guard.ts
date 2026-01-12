import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // check if token exists in session storage
  const token = sessionStorage.getItem('auth_token');

  if (!token) {
    // store the attempted URL for redirecting
    sessionStorage.setItem('redirectUrl', state.url);
    // redirect to login page if token does not exist
    router.navigate(['/login']);
    return false;
  }

  return true;
};

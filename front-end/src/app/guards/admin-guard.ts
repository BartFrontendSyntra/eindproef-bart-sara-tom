import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = sessionStorage.getItem('user_role');
  if (role !== 'admin') {
    alert('Access denied. Admins only.');
    router.navigate(['/admin-login']);
    return false;
  }
  return true;
};

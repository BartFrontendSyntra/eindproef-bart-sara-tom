import { CanActivateFn } from '@angular/router';

export const rangerGuard: CanActivateFn = (route, state) => {
  return true;
};

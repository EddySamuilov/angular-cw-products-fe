import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('ROUTE', route);
  console.log('STATE', state);

  const userService = inject(UserService);
  return userService.isLogged;
};

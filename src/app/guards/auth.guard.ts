import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);
  console.log('THIS IS THE AUTH GUARD');
  console.log(userService.isLogged);
  
  if (!userService.isLogged) {
    router.navigateByUrl('/not-allowed');
    return false
  }

  return true;
};

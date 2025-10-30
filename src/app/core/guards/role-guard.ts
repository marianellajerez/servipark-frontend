import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUserRole = authService.getRole();
  const expectedRole = route.data['expectedRole'];

  if (currentUserRole === expectedRole) {
    return true;
  }

  console.error('Acceso denegado: Se requiere rol', expectedRole);
  router.navigate(['/dashboard']); 
  return false;
};
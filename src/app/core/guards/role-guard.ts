import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(Auth);
  const router = inject(Router);
  const currentUserRole = auth.getRole();
  const expectedRole = route.data['expectedRole'];

  if (currentUserRole === expectedRole) {
    return true;
  }

  console.error('Acceso denegado: Se requiere rol', expectedRole);
  router.navigate(['/dashboard']); 
  return false;
};
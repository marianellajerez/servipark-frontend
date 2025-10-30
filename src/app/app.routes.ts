import { Routes } from '@angular/router';
import { Login } from './public/login/login';
import { Dashboard } from './features/dashboard/dashboard';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

import { IngresarVehiculo } from './features/tasks/ingresar-vehiculo/ingresar-vehiculo'; 
import { GestionarUsuarios } from './features/tasks/gestionar-usuarios/gestionar-usuarios';

export const routes: Routes = [
  
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    
    children: [
      {
        path: 'ingresar-vehiculo',
        component: IngresarVehiculo
      },
      {
        path: 'gestionar-usuarios',
        component: GestionarUsuarios,
        canActivate: [roleGuard],
        data: {
          expectedRole: 'ADMINISTRADOR'
        }
      },
      { 
        path: '', 
        redirectTo: 'ingresar-vehiculo',
        pathMatch: 'full' 
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
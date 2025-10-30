// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { RegistrarEntrada } from './features/tasks/registrar-entrada/registrar-entrada';
import { GestionarUsuarios } from './features/tasks/gestionar-usuarios/gestionar-usuarios';

export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    
    children: [
      {
        path: 'registrar-entrada',
        component: RegistrarEntrada
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
        redirectTo: 'registrar-entrada', 
        pathMatch: 'full' 
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
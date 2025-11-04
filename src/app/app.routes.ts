import { Routes } from '@angular/router';
import { Login } from './public/login/login';
import { Dashboard } from './features/dashboard/dashboard';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

import { IngresarVehiculo } from './features/tasks/ingresar-vehiculo/ingresar-vehiculo';
import { GestionarUsuarios } from './features/tasks/gestionar-usuarios/gestionar-usuarios';
import { VerTicketActivo } from './features/tasks/ver-ticket-activo/ver-ticket-activo';
import { TicketDetalle } from './features/tasks/ticket-detalle/ticket-detalle';
import { CobrarParqueo } from './features/tasks/cobrar-parqueo/cobrar-parqueo';
import { TicketSalidaRecibo } from './features/tasks/ticket-salida-recibo/ticket-salida-recibo';
import { GestionarTiposVehiculo } from './features/tasks/admin/gestionar-tipos-vehiculo/gestionar-tipos-vehiculo';
import { GestionarTarifas } from './features/tasks/admin/gestionar-tarifas/gestionar-tarifas';

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
        path: 'ver-ticket-activo',
        component: VerTicketActivo
      },
      {
        path: 'cobrar-parqueo',
        component: CobrarParqueo
      },
      {
        path: 'recibo-salida',
        component: TicketSalidaRecibo
      },
      {
        path: 'ticket/:placa',
        component: TicketDetalle
      },
      {
        path: 'admin/tipos-vehiculo',
        component: GestionarTiposVehiculo,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMINISTRADOR' }
      },
      {
        path: 'admin/tarifas',
        component: GestionarTarifas,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMINISTRADOR' }
      },
      {
        path: 'admin/usuarios',
        component: GestionarUsuarios,
        canActivate: [roleGuard],
        data: {
          expectedRole: 'ADMINISTRADOR'
        }
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
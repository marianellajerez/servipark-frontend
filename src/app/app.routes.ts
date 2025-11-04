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
import { GestionarTipoVehiculoDetalle } from './features/tasks/admin/gestionar-tipo-vehiculo-detalle/gestionar-tipo-vehiculo-detalle';

export const routes: Routes = [

  { 
    path: 'login', 
    component: Login, 
    title: 'Iniciar Sesión' 
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: 'ingresar-vehiculo',
        component: IngresarVehiculo,
        title: 'Ingresar Vehículo'
      },
      {
        path: 'ver-ticket-activo',
        component: VerTicketActivo,
        title: 'Ver Ticket Activo'
      },
      {
        path: 'cobrar-parqueo',
        component: CobrarParqueo,
        title: 'Cobrar Parqueo'
      },
      {
        path: 'recibo-salida',
        component: TicketSalidaRecibo,
        title: 'Recibo de Salida'
      },
      {
        path: 'ticket/:placa',
        component: TicketDetalle,
        title: 'Detalle de Ticket'
      },
      {
        path: 'admin/tipos-vehiculo',
        component: GestionarTiposVehiculo,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMINISTRADOR' },
        title: 'Admin: Tipos de Vehículo'
      },
      {
        path: 'admin/tipos-vehiculo-detalle/:id',
        component: GestionarTipoVehiculoDetalle,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMINISTRADOR' },
        title: 'Admin: Gestionar Tipo'
      },
      { 
        path: 'admin/tarifas', 
        redirectTo: 'admin/tipos-vehiculo', 
        pathMatch: 'full' 
      },
      {
        path: 'admin/usuarios',
        component: GestionarUsuarios,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMINISTRADOR' },
        title: 'Admin: Usuarios'
      },
      {
        path: 'gestionar-usuarios',
        redirectTo: 'admin/usuarios',
        pathMatch: 'full'
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
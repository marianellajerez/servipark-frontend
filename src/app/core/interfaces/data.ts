export interface Rol {
  idRol: number;
  nombre: string;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  correo: string;
  activo: boolean;
  fechaCreacion: string;
  idRol: number;
  rolNombre: string;
}

export interface UsuarioCreate {
  nombre: string;
  correo: string;
  contrasena: string;
  idRol: number;
}

export interface UsuarioUpdate {
  nombre: string;
  correo: string;
  contrasena?: string;
  idRol: number;
}

export interface TipoVehiculo {
  idTipoVehiculo: number;
  nombre: string;
  activo: boolean;
  valorPorMinutoVigente: number | null;
}

export interface TipoVehiculoConTarifaCreate {
  nombre: string;
  valorPorMinuto: number;
}

export interface TicketIngreso {
  idTicket: number;
  fechaIngreso: string;
  fechaSalida: string | null;
  valorTotal: number | null;
  idUsuario: number;
  emailUsuario: string;
  idVehiculo: number;
  placaVehiculo: string;
  tipoVehiculo: string;
  idTarifa: number;
  valorPorMinutoTarifa: number;
}

export interface TarifaResponse {
  idTarifa: number;
  valorPorMinuto: number;
  fechaInicio: string;
  fechaFin: string | null;
  idTipoVehiculo: number;
  nombreTipoVehiculo: string;
}

export interface TarifaCreate {
  valorPorMinuto: number;
  idTipoVehiculo: number;
}
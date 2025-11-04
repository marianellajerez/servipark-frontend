import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class Vehiculo {
  
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de tipos de vehículo activos
   * (Endpoint: GET /tipos-vehiculo)
   */
  getTiposVehiculo(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}/tipos-vehiculo`);
  }

  /**
   * Registra la entrada de un vehículo
   * (Endpoint: POST /tickets/ingreso)
   * @param data { placa: string, idTipoVehiculo: number }
   */
  registrarEntrada(data: { placa: string; idTipoVehiculo: number }): Observable<TicketIngreso> {
    return this.http.post<TicketIngreso>(`${this.apiUrl}/tickets/ingreso`, data);
  }

  /**
   * Busca un ticket activo por placa
   * (Endpoint: GET /tickets/activo/{placa})
   */
  getTicketActivo(placa: string): Observable<TicketIngreso> {
    return this.http.get<TicketIngreso>(`${this.apiUrl}/tickets/activo/${placa}`);
  }

  /**
   * Registra la salida (pago) de un vehículo
   * (Endpoint: PUT /tickets/salida)
   * @param placa La placa del vehículo
   */
  registrarSalida(placa: string): Observable<TicketIngreso> {
    return this.http.put<TicketIngreso>(`${this.apiUrl}/tickets/salida`, { placa });
  }

  /**
   * [POST] Crea un nuevo tipo de vehículo.
   * (Endpoint: POST /tipos-vehiculo)
   * @param data { nombre: string }
   */
  createTipoVehiculo(data: { nombre: string }): Observable<TipoVehiculo> {
    return this.http.post<TipoVehiculo>(`${this.apiUrl}/tipos-vehiculo`, data);
  }

  /**
   * [PUT] Actualiza un tipo de vehículo existente.
   * (Endpoint: PUT /tipos-vehiculo/{id})
   * @param id El ID del tipo a actualizar
   * @param data { nombre: string }
   */
  updateTipoVehiculo(id: number, data: { nombre: string }): Observable<TipoVehiculo> {
    return this.http.put<TipoVehiculo>(`${this.apiUrl}/tipos-vehiculo/${id}`, data);
  }

  /**
   * [DELETE] Desactiva (soft delete) un tipo de vehículo.
   * (Endpoint: DELETE /tipos-vehiculo/{id})
   * @param id El ID del tipo a desactivar
   */
  deactivateTipoVehiculo(id: number): Observable<void> {
    // El 'responseType: 'text'' es un comodín común para respuestas vacías (204 No Content)
    return this.http.delete<void>(`${this.apiUrl}/tipos-vehiculo/${id}`);
  }

  /**
   * [GET] Obtiene todas las tarifas (históricas y vigentes).
   * (Endpoint: GET /api/v1/tarifas)
   */
  getTarifas(): Observable<TarifaResponse[]> {
    return this.http.get<TarifaResponse[]>(`${this.apiUrl}/tarifas`);
  }

  /**
   * [POST] Crea una nueva tarifa (y cierra la anterior).
   * (Endpoint: POST /api/v1/tarifas)
   */
  createTarifa(data: TarifaCreate): Observable<TarifaResponse> {
    return this.http.post<TarifaResponse>(`${this.apiUrl}/tarifas`, data);
  }

  /**
   * [GET] Obtiene todos los roles.
   * (Endpoint: GET /api/v1/roles)
   */
  getRoles(): Observable<Rol[]> {
    // !!! ASUNCIÓN IMPORTANTE !!!
    // Estoy asumiendo que tienes un endpoint de roles.
    // Si no existe, deberás crearlo en tu backend.
    return this.http.get<Rol[]>(`${this.apiUrl}/roles`);
  }

  /**
   * [GET] Obtiene todos los usuarios activos.
   * (Endpoint: GET /api/v1/usuarios)
   */
  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/usuarios`);
  }

  /**
   * [POST] Crea un nuevo usuario.
   * (Endpoint: POST /api/v1/usuarios)
   */
  createUsuario(data: UsuarioCreate): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/usuarios`, data);
  }

  /**
   * [PUT] Actualiza un usuario.
   * (Endpoint: PUT /api/v1/usuarios/{id})
   */
  updateUsuario(id: number, data: UsuarioUpdate): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/usuarios/${id}`, data);
  }

  /**
   * [DELETE] Desactiva (soft delete) un usuario.
   * (Endpoint: DELETE /api/v1/usuarios/{id})
   */
  deactivateUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }
}
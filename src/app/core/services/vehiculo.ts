import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TipoVehiculo {
  idTipoVehiculo: number;
  nombre: string;
  activo: boolean;
}

export interface TicketIngreso {
  idTicket: number;
  fechaIngreso: string;
  placaVehiculo: string;
  tipoVehiculo: string;
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
}
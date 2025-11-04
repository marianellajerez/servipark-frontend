import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketIngreso } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class Ticket {
  
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * Registra la entrada de un vehículo
   * (Endpoint: POST /tickets/ingreso)
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
   */
  registrarSalida(placa: string): Observable<TicketIngreso> {
    return this.http.put<TicketIngreso>(`${this.apiUrl}/tickets/salida`, { placa });
  }
}
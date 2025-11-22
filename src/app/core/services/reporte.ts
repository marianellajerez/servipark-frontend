import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketIngreso } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = 'http://localhost:8080/api/v1/tickets';

  constructor(private http: HttpClient) { }

  /**
   * Llama al endpoint GET /api/v1/tickets/cerrados
   */
  getTicketsCerrados(fechaInicio: string, fechaFin: string): Observable<TicketIngreso[]> {
    
    // Las fechas ya deben venir en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get<TicketIngreso[]>(`${this.apiUrl}/cerrados`, { params });
  }
}
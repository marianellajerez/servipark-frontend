import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TarifaResponse, TarifaCreate } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class Tarifa {
  
  private apiUrl = 'http://localhost:8080/api/v1/tarifas';

  constructor(private http: HttpClient) { }

  /**
   * [GET] Obtiene todas las tarifas (históricas y vigentes).
   */
  getTarifas(): Observable<TarifaResponse[]> {
    return this.http.get<TarifaResponse[]>(this.apiUrl);
  }

  /**
   * [GET] Obtiene el historial de tarifas para un solo tipo de vehículo.
   */
  getTarifaHistory(idTipoVehiculo: number): Observable<TarifaResponse[]> {
    return this.http.get<TarifaResponse[]>(`${this.apiUrl}/historial/${idTipoVehiculo}`);
  }

  /**
   * [POST] Crea una nueva tarifa (y cierra la anterior).
   */
  createTarifa(data: TarifaCreate): Observable<TarifaResponse> {
    return this.http.post<TarifaResponse>(this.apiUrl, data);
  }
}

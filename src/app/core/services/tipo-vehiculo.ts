import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoVehiculo, TipoVehiculoConTarifaCreate } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {
  
  private apiUrl = 'http://localhost:8080/api/v1/tipos-vehiculo';

  constructor(private http: HttpClient) { }

  /**
   * [GET] Obtiene la lista de todos los tipos de vehículo (con tarifa vigente).
   */
  getTiposVehiculo(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(this.apiUrl);
  }

  /**
   * [GET] Obtiene un solo tipo de vehículo por ID.
   */
  getTipoVehiculoById(id: number): Observable<TipoVehiculo> {
    return this.http.get<TipoVehiculo>(`${this.apiUrl}/${id}`);
  }

  /**
   * [POST] Crea un nuevo tipo de vehículo y su tarifa inicial.
   */
  createTipoVehiculoConTarifa(data: TipoVehiculoConTarifaCreate): Observable<TipoVehiculo> {
    return this.http.post<TipoVehiculo>(this.apiUrl, data);
  }

  /**
   * [PUT] Actualiza el nombre de un tipo de vehículo existente.
   */
  updateTipoVehiculo(id: number, data: { nombre: string }): Observable<TipoVehiculo> {
    return this.http.put<TipoVehiculo>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * [DELETE] Desactiva (soft delete) un tipo de vehículo.
   */
  deactivateTipoVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * [PUT] Reactiva un tipo de vehículo.
   */
  activateTipoVehiculo(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/activar`, null);
  }
}

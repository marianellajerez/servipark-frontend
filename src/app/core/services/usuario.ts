import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol, UsuarioResponse, UsuarioCreate, UsuarioUpdate } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class Usuario {
  
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * [GET] Obtiene todos los roles.
   */
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/roles`);
  }

  /**
   * [GET] Obtiene todos los usuarios activos.
   */
  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/usuarios`);
  }

  /**
   * [POST] Crea un nuevo usuario.
   */
  createUsuario(data: UsuarioCreate): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/usuarios`, data);
  }

  /**
   * [PUT] Actualiza un usuario.
   */
  updateUsuario(id: number, data: UsuarioUpdate): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/usuarios/${id}`, data);
  }

  /**
   * [DELETE] Desactiva (soft delete) un usuario.
   */
  deactivateUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

import { Vehiculo, UsuarioResponse, Rol, UsuarioCreate, UsuarioUpdate } from '../../../core/services/vehiculo';
import { UsuarioModal } from '../../../shared/components/usuario-modal/usuario-modal';

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    UsuarioModal
  ],
  templateUrl: './gestionar-usuarios.html',
  styleUrls: ['./gestionar-usuarios.css']
})
export class GestionarUsuarios implements OnInit {

  usuarios$: Observable<UsuarioResponse[]> = of([]);
  roles$: Observable<Rol[]> = of([]);

  isModalOpen = false;
  selectedUsuario: UsuarioResponse | null = null;

  constructor(private vehiculoService: Vehiculo) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.usuarios$ = this.vehiculoService.getUsuarios();
    this.roles$ = this.vehiculoService.getRoles();
  }

  openCreateModal(): void {
    this.selectedUsuario = null; 
    this.isModalOpen = true;
  }

  openEditModal(user: UsuarioResponse): void {
    this.selectedUsuario = user; 
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSave(formData: UsuarioCreate | UsuarioUpdate): void {
    const request$ = this.selectedUsuario
      ? this.vehiculoService.updateUsuario(this.selectedUsuario.id, (formData as UsuarioUpdate))
      : this.vehiculoService.createUsuario(formData as UsuarioCreate);

    request$.subscribe({
      next: () => {
        this.loadData(); 
        this.closeModal();
      },
      error: (err: any) => {
        console.error("Error guardando usuario:", err);
        alert(`Error: ${err.error.message || 'El correo ya existe o hubo un problema.'}`);
      }
    });
  }

  handleDeactivate(id: number): void {
    if (confirm("¿Está seguro de que desea DESACTIVAR este usuario?")) {

      this.vehiculoService.deactivateUsuario(id).subscribe({
        next: () => {
          this.loadData();
          this.closeModal();
        },
        error: (err: any) => {
          console.error("Error desactivando:", err);
          alert("No se pudo desactivar el usuario.");
        }
      });
    }
  }
}
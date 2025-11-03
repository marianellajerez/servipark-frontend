import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Vehiculo, TipoVehiculo } from '../../../../core/services/vehiculo';
import { TipoVehiculoModal } from '../../../../shared/components/tipo-vehiculo-modal/tipo-vehiculo-modal';

@Component({
  selector: 'app-gestionar-tipos-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    TipoVehiculoModal
  ],
  templateUrl: './gestionar-tipos-vehiculo.html',
  styleUrls: ['./gestionar-tipos-vehiculo.css']
})
export class GestionarTiposVehiculo implements OnInit {

  tiposVehiculo$: Observable<TipoVehiculo[]> = of([]);

  isModalOpen = false;
  selectedTipo: TipoVehiculo | null = null;

  constructor(private vehiculoService: Vehiculo) { }

  ngOnInit(): void {
    this.loadTipos();
  }

  loadTipos(): void {
    this.tiposVehiculo$ = this.vehiculoService.getTiposVehiculo();
  }

  openCreateModal(): void {
    this.selectedTipo = null;
    this.isModalOpen = true;
  }

  openEditModal(tipo: TipoVehiculo): void {
    this.selectedTipo = tipo;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSave(formData: { nombre: string }): void {
    const request$ = this.selectedTipo
      ? this.vehiculoService.updateTipoVehiculo(this.selectedTipo.idTipoVehiculo, formData)
      : this.vehiculoService.createTipoVehiculo(formData);

    request$.subscribe({
      next: () => {
        this.loadTipos();
        this.closeModal();
      },
      error: (err: any) => {
        console.error("Error guardando tipo:", err);
        alert(`Error: ${err.error.message || 'El nombre ya existe o hubo un problema.'}`);
      }
    });
  }

  handleDeactivate(id: number): void {
    if (confirm("¿Está seguro de que desea DESACTIVAR este tipo de vehículo? Esto cerrará las tarifas vigentes.")) {

      this.vehiculoService.deactivateTipoVehiculo(id).subscribe({
        next: () => {
          this.loadTipos();
          this.closeModal();
        },
        error: (err: any) => {
          console.error("Error desactivando:", err);
          alert("No se pudo desactivar el tipo de vehículo.");
        }
      });
    }
  }
}
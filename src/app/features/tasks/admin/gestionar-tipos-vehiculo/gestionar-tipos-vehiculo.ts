import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TipoVehiculo, TipoVehiculoConTarifaCreate } from '../../../../core/interfaces/data';
import { TipoVehiculoService } from '../../../../core/services/tipo-vehiculo';
import { TipoVehiculoModal } from '../../../../shared/components/tipo-vehiculo-modal/tipo-vehiculo-modal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-tipos-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    TipoVehiculoModal,
    RouterLink
  ],
  templateUrl: './gestionar-tipos-vehiculo.html',
  styleUrls: ['./gestionar-tipos-vehiculo.css']
})
export class GestionarTiposVehiculo implements OnInit {

  tiposVehiculo$: Observable<TipoVehiculo[]> = of([]);
  isModalOpen = false;

  constructor(private tipoVehiculoService: TipoVehiculoService) { }

  ngOnInit(): void {
    this.loadTipos();
  }

  loadTipos(): void {
    this.tiposVehiculo$ = this.tipoVehiculoService.getTiposVehiculo();
  }

  openCreateModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSave(formData: TipoVehiculoConTarifaCreate): void {
    this.tipoVehiculoService.createTipoVehiculoConTarifa(formData).subscribe({
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
}
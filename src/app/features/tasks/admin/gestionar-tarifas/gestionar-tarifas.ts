import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

import { TarifaResponse, TarifaCreate } from '../../../../core/interfaces/data';
import { Tarifa } from '../../../../core/services/tarifa';
import { TarifaModal } from '../../../../shared/components/tarifa-modal/tarifa-modal';

@Component({
  selector: 'app-gestionar-tarifas',
  standalone: true,
  imports: [
    CommonModule,
    TarifaModal
  ],
  templateUrl: './gestionar-tarifas.html',
  styleUrls: ['./gestionar-tarifas.css']
})
export class GestionarTarifas implements OnInit {

  tarifas$: Observable<TarifaResponse[]> = of([]);
  isModalOpen = false;

  constructor(private tarifaService: Tarifa) { }

  ngOnInit(): void {
    this.loadTarifas();
  }

  loadTarifas(): void {
    this.tarifas$ = this.tarifaService.getTarifas();
  }

  openCreateModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSave(formData: TarifaCreate): void {

    this.tarifaService.createTarifa(formData).subscribe({
      next: () => {
        this.loadTarifas();
        this.closeModal();
      },
      error: (err: any) => {
        console.error("Error creando tarifa:", err);
        alert(`Error: ${err.error.message || 'Hubo un problema al crear la tarifa.'}`);
      }
    });
  }
}
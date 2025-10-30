import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehiculo, TicketIngreso } from '../../../core/services/vehiculo';

import { TicketRecibo } from '../../../shared/components/ticket-recibo/ticket-recibo';

@Component({
  selector: 'app-ver-ticket-activo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TicketRecibo
  ],
  templateUrl: './ver-ticket-activo.html',
  styleUrls: ['./ver-ticket-activo.css']
})
export class VerTicketActivo {

  searchForm: FormGroup;
  ticketEncontrado: TicketIngreso | null = null;
  errorMensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vehiculo: Vehiculo
  ) {
    this.searchForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.ticketEncontrado = null;
    this.errorMensaje = null;
    const placa = this.searchForm.value.placa.toUpperCase();

    this.vehiculo.getTicketActivo(placa).subscribe({
      next: (response) => {
        this.ticketEncontrado = response;
      },
      error: (err) => {
        this.ticketEncontrado = null;
        this.errorMensaje = `Error: ${err.error.message || 'No se encontró ticket activo para la placa ' + placa}`;
      }
    });
  }
}
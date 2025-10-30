// src/app/features/tasks/ingresar-vehiculo/ingresar-vehiculo.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehiculo, TipoVehiculo, TicketIngreso } from '../../../core/services/vehiculo';
import { Observable } from 'rxjs';

import { TicketRecibo } from '../../../shared/components/ticket-recibo/ticket-recibo';

@Component({
  selector: 'app-ingresar-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TicketRecibo
  ],
  templateUrl: './ingresar-vehiculo.html',
  styleUrls: ['./ingresar-vehiculo.css']
})
export class IngresarVehiculo {

  ingresoForm: FormGroup;
  tiposVehiculo$: Observable<TipoVehiculo[]>; 

  ticketGenerado: TicketIngreso | null = null;
  errorMensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vehiculo: Vehiculo
  ) {
    this.ingresoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]], 
      idTipoVehiculo: [null, [Validators.required]] 
    });
    this.tiposVehiculo$ = this.vehiculo.getTiposVehiculo();
  }

  onSubmit(): void {
    if (this.ingresoForm.invalid) {
      this.ingresoForm.markAllAsTouched(); 
      return; 
    }

    this.ticketGenerado = null;
    this.errorMensaje = null;

    const formData = this.ingresoForm.value;
    formData.placa = formData.placa.toUpperCase();

    this.vehiculo.registrarEntrada(formData).subscribe({
      next: (response) => {
        this.ticketGenerado = response; 
        this.ingresoForm.reset(); 
      },
      error: (err) => {
        this.errorMensaje = `Error: ${err.error.message || 'No se pudo registrar la entrada'}`;
      }
    });
  }

  /**
   * Vuelve a mostrar el formulario
   */
  registrarOtroVehiculo(): void {
    this.ticketGenerado = null;
    this.errorMensaje = null;
  }
}
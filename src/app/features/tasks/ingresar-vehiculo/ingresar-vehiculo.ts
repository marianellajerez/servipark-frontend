import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoVehiculo } from '../../../core/interfaces/data';
import { Ticket } from '../../../core/services/ticket';
import { TipoVehiculoService } from '../../../core/services/tipo-vehiculo';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './ingresar-vehiculo.html',
  styleUrls: ['./ingresar-vehiculo.css']
})
export class IngresarVehiculo {

  ingresoForm: FormGroup;
  tiposVehiculo$: Observable<TipoVehiculo[]>; 
  
  errorMensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ticketService: Ticket,
    private tipoVehiculoService: TipoVehiculoService,
    private router: Router
  ) {
    this.ingresoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]], 
      idTipoVehiculo: [null, [Validators.required]] 
    });
    this.tiposVehiculo$ = this.tipoVehiculoService.getTiposVehiculo();
  }

  onSubmit(): void {
    if (this.ingresoForm.invalid) {
      this.ingresoForm.markAllAsTouched(); 
      return; 
    }

    this.errorMensaje = null;
    const formData = this.ingresoForm.value;
    formData.placa = formData.placa.toUpperCase();

    this.ticketService.registrarEntrada(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard/ticket', response.placaVehiculo]);
      },
      error: (err: any) => {
        this.errorMensaje = `Error: ${err.error.message || 'No se pudo registrar la entrada'}`;
      }
    });
  }
}
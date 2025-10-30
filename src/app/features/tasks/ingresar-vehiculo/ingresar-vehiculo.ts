import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehiculo, TipoVehiculo } from '../../../core/services/vehiculo';
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
    private vehiculo: Vehiculo,
    private router: Router
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

    this.errorMensaje = null;
    const formData = this.ingresoForm.value;
    formData.placa = formData.placa.toUpperCase();

    this.vehiculo.registrarEntrada(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard/ticket', response.placaVehiculo]);
      },
      error: (err) => {
        this.errorMensaje = `Error: ${err.error.message || 'No se pudo registrar la entrada'}`;
      }
    });
  }
}
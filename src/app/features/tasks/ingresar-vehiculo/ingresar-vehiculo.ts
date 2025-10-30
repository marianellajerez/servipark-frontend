import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehiculo, TipoVehiculo } from '../../../core/services/vehiculo';
import { Observable } from 'rxjs';

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
export class IngresarVehiculo implements OnInit {

  ingresoForm: FormGroup;
  tiposVehiculo$: Observable<TipoVehiculo[]>;
  
  mensaje: string = '';
  mensajeTipo: 'exito' | 'error' = 'exito';

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

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.ingresoForm.invalid) {
      this.ingresoForm.markAllAsTouched();
      return; 
    }

    this.mensaje = ''; 
    const formData = this.ingresoForm.value;
    
    formData.placa = formData.placa.toUpperCase();

    this.vehiculo.registrarEntrada(formData).subscribe({
      next: (response) => {
        this.mensaje = `¡Éxito! Vehículo ${response.placaVehiculo} ingresado. Ticket #${response.idTicket}`;
        this.mensajeTipo = 'exito';
        this.ingresoForm.reset(); 
      },
      error: (err) => {
        this.mensaje = `Error: ${err.error.message || 'No se pudo registrar la entrada'}`;
        this.mensajeTipo = 'error';
      }
    });
  }
}
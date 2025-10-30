import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vehiculo } from '../../../core/services/vehiculo';

@Component({
  selector: 'app-cobrar-parqueo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cobrar-parqueo.html',
  styleUrls: ['./cobrar-parqueo.css']
})
export class CobrarParqueo {

  searchForm: FormGroup;
  errorMensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehiculo: Vehiculo
  ) {
    this.searchForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) { return; }

    this.errorMensaje = null;
    const placa = this.searchForm.value.placa.toUpperCase();

    this.vehiculo.registrarSalida(placa).subscribe({
      next: (ticketPagado) => {
        this.router.navigate(['/dashboard/recibo-salida'], {
          state: { ticket: ticketPagado }
        });
      },
      error: (err) => {
        this.errorMensaje = `Error: ${err.error.message || 'No se pudo procesar el pago'}`;
      }
    });
  }
}
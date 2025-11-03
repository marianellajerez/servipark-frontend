import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Vehiculo, TipoVehiculo } from '../../../core/services/vehiculo';

@Component({
  selector: 'app-tarifa-modal',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './tarifa-modal.html',
  styleUrls: ['../../components/tipo-vehiculo-modal/tipo-vehiculo-modal.css']
})
export class TarifaModal implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ valorPorMinuto: number, idTipoVehiculo: number }>();

  form: FormGroup;
  tiposVehiculo$: Observable<TipoVehiculo[]> = of([]);

  constructor(
    private fb: FormBuilder,
    private vehiculoService: Vehiculo
  ) {
    this.form = this.fb.group({
      valorPorMinuto: [null, [Validators.required, Validators.min(1)]],
      idTipoVehiculo: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tiposVehiculo$ = this.vehiculoService.getTiposVehiculo();
  }

  onSave(): void {
    if (this.form.invalid) return;
    this.save.emit(this.form.value);
  }

  onClose(): void {
    this.close.emit();
  }
}
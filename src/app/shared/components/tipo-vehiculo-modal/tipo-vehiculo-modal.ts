import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculo } from '../../../core/services/vehiculo';

@Component({
  selector: 'app-tipo-vehiculo-modal',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './tipo-vehiculo-modal.html',
  styleUrls: ['./tipo-vehiculo-modal.css']
})
export class TipoVehiculoModal implements OnInit {

  @Input() data: TipoVehiculo | null = null; 

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ nombre: string }>();
  @Output() deactivate = new EventEmitter<number>();

  form: FormGroup;
  isEditMode = false;
  modalTitle = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      // Modo Edición
      this.isEditMode = true;
      this.modalTitle = 'Editar Tipo de Vehículo';
      this.form.patchValue({ nombre: this.data.nombre });
    } else {
      // Modo Creación
      this.isEditMode = false;
      this.modalTitle = 'Crear Tipo de Vehículo';
    }
  }

  onSave(): void {
    if (this.form.invalid) return;
    this.save.emit(this.form.value);
  }

  onDeactivate(): void {
    if (!this.data) return;
    this.deactivate.emit(this.data.idTipoVehiculo);
  }

  onClose(): void {
    this.close.emit();
  }
}
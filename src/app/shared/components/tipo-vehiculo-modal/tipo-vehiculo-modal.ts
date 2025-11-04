import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculo } from '../../../core/interfaces/data';

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
  @Output() save = new EventEmitter<any>();
  @Output() deactivate = new EventEmitter<number>();
  @Output() activate = new EventEmitter<number>();

  form: FormGroup;
  isEditMode = false;
  modalTitle = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      valorPorMinuto: [null]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.modalTitle = 'Editar Tipo de Vehículo';
      this.form.patchValue({ nombre: this.data.nombre });
      this.form.get('valorPorMinuto')?.clearValidators();
    } else {
      this.isEditMode = false;
      this.modalTitle = 'Crear Tipo de Vehículo';
      this.form.get('valorPorMinuto')?.setValidators([Validators.required, Validators.min(1)]);
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const formData = this.form.value;
    if (this.isEditMode) {
      delete formData.valorPorMinuto;
    }

    this.save.emit(formData);
  }

  onDeactivate(): void {
    if (!this.data) return;
    this.deactivate.emit(this.data.idTipoVehiculo);
  }

  onActivate(): void {
    if (!this.data) return;
    this.activate.emit(this.data.idTipoVehiculo);
  }

  onClose(): void {
    this.close.emit();
  }
}
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioResponse, Rol } from '../../../core/interfaces/data';

@Component({
  selector: 'app-usuario-modal',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './usuario-modal.html',
  styleUrls: ['../../components/tipo-vehiculo-modal/tipo-vehiculo-modal.css']
})
export class UsuarioModal implements OnInit {

  @Input() data: UsuarioResponse | null = null; 
  @Input() roles: Rol[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>(); 
  @Output() deactivate = new EventEmitter<number>();

  form: FormGroup;
  isEditMode = false;
  modalTitle = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [''],
      idRol: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.modalTitle = 'Editar Usuario';
      this.form.get('contrasena')?.clearValidators();
      this.form.patchValue({
        nombre: this.data.nombre,
        correo: this.data.correo,
        idRol: this.data.idRol
      });
    } else {
      this.isEditMode = false;
      this.modalTitle = 'Crear Nuevo Usuario';
      this.form.get('contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    if (this.isEditMode && !formData.contrasena) {
      delete formData.contrasena;
    }

    this.save.emit(formData);
  }

  onDeactivate(): void {
    if (!this.data) return;
    this.deactivate.emit(this.data.id);
  }

  onClose(): void {
    this.close.emit();
  }
}
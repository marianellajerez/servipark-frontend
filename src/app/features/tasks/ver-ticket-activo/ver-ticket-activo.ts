import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-ticket-activo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './ver-ticket-activo.html',
  styleUrls: ['./ver-ticket-activo.css']
})
export class VerTicketActivo {
  
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }
    
    const placa = this.searchForm.value.placa.toUpperCase();

    this.router.navigate(['/dashboard/ticket', placa]);
  }
}
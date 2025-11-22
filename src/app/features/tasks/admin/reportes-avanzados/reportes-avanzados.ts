import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReporteService } from '../../../../core/services/reporte'; 
import { TicketIngreso } from '../../../../core/interfaces/data';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { KpiCard } from './../kpi-card/kpi-card'; 
import { DistribucionVehiculo } from './../distribucion-vehiculo/distribucion-vehiculo';
import { TendenciaIngresos } from './../tendencia-ingresos/tendencia-ingresos';
import { TablaHistorialTickets } from './../tabla-historial-tickets/tabla-historial-tickets';

@Component({
  selector: 'app-reportes-avanzados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KpiCard, 
    DistribucionVehiculo,
    TendenciaIngresos,
    TablaHistorialTickets
  ],
  templateUrl: './reportes-avanzados.html',
  styleUrls: ['./reportes-avanzados.css']
})
export class ReportesAvanzados implements OnInit {

  reporteForm!: FormGroup;
  ticketsCerrados: TicketIngreso[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  hasSearched = false;

  ingresosTotales: number = 0;
  ticketsTotales: number = 0;

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.generarReporte();
  }

  private initializeForm(): void {
    const fechaFin = new Date();
    const fechaInicioDefault = new Date();
    fechaInicioDefault.setDate(fechaInicioDefault.getDate() - 7); 
    
    this.reporteForm = this.fb.group({
        fechaInicio: [this.formatDateForInput(fechaInicioDefault).replace('T00:00:00', 'T00:00:00'), Validators.required],
        fechaFin: [this.formatDateForInput(fechaFin).replace('T00:00:00', 'T23:59:59'), Validators.required]
    });
  }
  
  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


  generarReporte(): void {
    if (this.reporteForm.invalid) {
      this.errorMessage = 'Por favor, asegúrate de que el rango de fechas sea válido.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.hasSearched = true;
    
    const fechaInicio = this.reporteForm.get('fechaInicio')?.value;
    const fechaFin = this.reporteForm.get('fechaFin')?.value;
    
    this.reporteService.getTicketsCerrados(fechaInicio, fechaFin)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data) => {
          this.ticketsCerrados = data;
          this.calcularKPIs(data);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al obtener reportes:', err);
          this.errorMessage = 'No se pudo cargar el reporte. Verifica la conexión o el formato de fechas.';
          this.ticketsCerrados = [];
          this.ingresosTotales = 0;
          this.ticketsTotales = 0;
        }
      });
  }

  private calcularKPIs(data: TicketIngreso[]): void {
    this.ingresosTotales = data.reduce((sum, ticket) => sum + (ticket.valorTotal || 0), 0);
    this.ticketsTotales = data.length;
  }
}
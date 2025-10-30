import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Vehiculo, TicketIngreso } from '../../../core/services/vehiculo';
import { Subscription, switchMap, catchError, EMPTY } from 'rxjs';

import { TicketRecibo } from '../../../shared/components/ticket-recibo/ticket-recibo';

@Component({
  selector: 'app-ticket-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    TicketRecibo
  ],
  templateUrl: './ticket-detalle.html',
  styleUrls: ['./ticket-detalle.css']
})
export class TicketDetalle implements OnInit, OnDestroy {

  ticket: TicketIngreso | null = null;
  errorMensaje: string | null = null;
  
  preliminaryMinutes: number | null = null;
  preliminaryCost: number | null = null;

  private timerId: any = null;
  private ticketSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehiculo: Vehiculo
  ) { }

  ngOnInit(): void {
    this.ticketSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        const placa = params.get('placa');
        if (!placa) {
          throw new Error('Placa no proporcionada en la ruta');
        }
        
        this.limpiarCalculos();
        return this.vehiculo.getTicketActivo(placa); 
      }),
      catchError(err => {
        this.errorMensaje = `Error: ${err.error.message || 'No se encontró un ticket activo para esta placa'}`;
        this.limpiarCalculos();
        return EMPTY;
      })
    ).subscribe(ticketData => {
        this.ticket = ticketData;
        
        if (ticketData && !ticketData.fechaSalida) {
          this.iniciarTimerCalculo();
        }
    });
  }

  /**
   * Se ejecuta al destruir el componente (ej. al navegar a otra página)
   */
  ngOnDestroy(): void {
    this.limpiarCalculos();
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  /**
   * Inicia el temporizador que actualiza el costo cada 10 segundos
   */
  iniciarTimerCalculo(): void {
    this.actualizarCalculoPreliminar();
    
    this.timerId = setInterval(() => {
      this.actualizarCalculoPreliminar();
    }, 10000);
  }

  /**
   * La lógica que calcula los minutos y el costo
   */
  actualizarCalculoPreliminar(): void {
    if (!this.ticket) return;

    try {
      const ingreso = new Date(this.ticket.fechaIngreso);
      const ahora = new Date();
      
      const diffMs = ahora.getTime() - ingreso.getTime();
      const minutos = Math.round(diffMs / 60000);
      
      this.preliminaryMinutes = minutos;
      this.preliminaryCost = minutos * this.ticket.valorPorMinutoTarifa;
    } catch (e) {
      console.error("Error calculando el costo preliminar:", e);
    }
  }

  /**
   * Limpia el timer y los valores calculados
   */
  limpiarCalculos(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.ticket = null;
    this.preliminaryMinutes = null;
    this.preliminaryCost = null;
  }
}
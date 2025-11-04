import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketIngreso } from '../../../core/interfaces/data';
import { Ticket } from '../../../core/services/ticket';
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
    private ticketService: Ticket
  ) { }

  ngOnInit(): void {
    this.ticketSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        const placa = params.get('placa');
        if (!placa) {
          throw new Error('Placa no proporcionada en la ruta');
        }
        
        this.limpiarCalculos();
        return this.ticketService.getTicketActivo(placa); 
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

  ngOnDestroy(): void {
    this.limpiarCalculos();
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  iniciarTimerCalculo(): void {
    this.actualizarCalculoPreliminar();
    
    this.timerId = setInterval(() => {
      this.actualizarCalculoPreliminar();
    }, 10000);
  }

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
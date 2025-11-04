import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatDurationPipe } from '../../pipes/format-duration-pipe';

@Component({
  selector: 'app-ticket-recibo',
  standalone: true,
  imports: [
    CommonModule,
    FormatDurationPipe
  ],
  templateUrl: './ticket-recibo.html',
  styleUrls: ['./ticket-recibo.css']
})
export class TicketRecibo implements OnChanges {

  @Input() ticket: any;
  @Input() preliminaryMinutes: number | null = null;
  @Input() preliminaryCost: number | null = null;

  ingresoDate: Date | null = null;
  salidaDate: Date | null = null;
  minutosTranscurridos: number | null = null;

  constructor() { }

  ngOnChanges(): void {
    if (this.ticket) {
      if (this.ticket.fechaIngreso) {
        this.ingresoDate = new Date(this.ticket.fechaIngreso);
      }
      if (this.ticket.fechaSalida) {
        this.salidaDate = new Date(this.ticket.fechaSalida);
        this.calcularMinutosFinales();
      }
    }
  }

  calcularMinutosFinales(): void {
    if (this.ingresoDate && this.salidaDate) {
      try {
        const diffMs = this.salidaDate.getTime() - this.ingresoDate.getTime();
        this.minutosTranscurridos = Math.round(diffMs / 60000);
      } catch (e) {
        console.error("Error calculando minutos:", e);
        this.minutosTranscurridos = null;
      }
    }
  }
}

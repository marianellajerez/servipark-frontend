import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-ticket-recibo',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './ticket-recibo.html',
  styleUrls: ['./ticket-recibo.css']
})
export class TicketRecibo implements OnChanges {

  @Input() ticket: any; 
  minutosTranscurridos: number | null = null;

  constructor() { }

  ngOnChanges(): void {
    if (this.ticket && this.ticket.fechaIngreso && this.ticket.fechaSalida) {
      this.calcularMinutos();
    }
  }

  calcularMinutos(): void {
    try {
      const ingreso = new Date(this.ticket.fechaIngreso);
      const salida = new Date(this.ticket.fechaSalida);

      const diffMs = salida.getTime() - ingreso.getTime();
      this.minutosTranscurridos = Math.round(diffMs / 60000);
    } catch (e) {
      console.error("Error calculando minutos:", e);
      this.minutosTranscurridos = null;
    }
  }
}
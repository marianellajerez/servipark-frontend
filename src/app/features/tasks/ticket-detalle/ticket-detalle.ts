import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Vehiculo, TicketIngreso } from '../../../core/services/vehiculo';
import { Observable, switchMap, catchError, EMPTY } from 'rxjs';
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
export class TicketDetalle implements OnInit {

  ticket$: Observable<TicketIngreso> | null = null;
  errorMensaje: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehiculo: Vehiculo
  ) { }

  ngOnInit(): void {
    this.ticket$ = this.route.paramMap.pipe(
      switchMap(params => {
        const placa = params.get('placa');
        if (!placa) {
          throw new Error('Placa no proporcionada en la ruta');
        }
        
        this.errorMensaje = null;
        return this.vehiculo.getTicketActivo(placa); 
      }),
      catchError(err => {
        this.errorMensaje = `Error: ${err.error.message || 'No se encontró un ticket activo para esta placa'}`;
        return EMPTY;
      })
    );
  }
}
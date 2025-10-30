import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TicketRecibo } from '../../../shared/components/ticket-recibo/ticket-recibo';

@Component({
  selector: 'app-ticket-salida-recibo',
  standalone: true,
  imports: [CommonModule, RouterLink, TicketRecibo],
  templateUrl: './ticket-salida-recibo.html',
  styleUrls: ['./ticket-salida-recibo.css']
})
export class TicketSalidaRecibo implements OnInit {

  ticket: any = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.ticket = navigation.extras.state['ticket'];
    }
  }

  ngOnInit(): void {
    if (!this.ticket) {
      this.router.navigate(['/dashboard/cobrar-parqueo']);
    }
  }
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-ticket-recibo',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './ticket-recibo.html',
  styleUrls: ['./ticket-recibo.css']
})
export class TicketRecibo {
  @Input() ticket: any; 

  constructor() { }
}
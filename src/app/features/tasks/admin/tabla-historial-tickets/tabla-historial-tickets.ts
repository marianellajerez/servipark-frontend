import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketIngreso } from '../../../../core/interfaces/data';

@Component({
  selector: 'app-tabla-historial-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-historial-tickets.html',
  styleUrls: ['./tabla-historial-tickets.css']
})
export class TablaHistorialTickets implements OnChanges {

  @Input() data: TicketIngreso[] = [];
  
  ticketsMostrados: TicketIngreso[] = []; 
  
  pageSize: number = 10;
  currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.currentPage = 1;
      this.applyPagination();
    }
  }
  
  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.ticketsMostrados = this.data.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.data.length) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }
}
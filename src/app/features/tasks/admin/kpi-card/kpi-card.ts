import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrls: ['./kpi-card.css']
})
export class KpiCard {

  /** * Aceptamos string o null. El pipe (currency/number) garantiza un string, 
   * pero definimos el Input de forma flexible para evitar el error del compilador.
   */
  @Input() title: string = '';
  @Input() value: string | null = '0';
  @Input() icon: string = '📈'; 

}
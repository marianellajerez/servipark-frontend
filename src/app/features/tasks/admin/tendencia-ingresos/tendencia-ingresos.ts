import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketIngreso } from '../../../../core/interfaces/data';
import { BaseChartDirective } from 'ng2-charts';
import { Chart as ChartJS, registerables, ChartConfiguration, ChartData, ChartType } from 'chart.js';

ChartJS.register(...registerables);

interface TendenciaData {
  fecha: string;
  ingresoTotal: number;
}

@Component({
  selector: 'app-tendencia-ingresos',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './tendencia-ingresos.html',
  styleUrls: ['./tendencia-ingresos.css']
})
export class TendenciaIngresos implements OnChanges {

  @Input() data: TicketIngreso[] = [];
  processedData: TendenciaData[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: 'Ingresos' }]
  };
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      x: { display: true, title: { display: true, text: 'Fecha' } },
      y: { display: true, title: { display: true, text: 'Ingresos' } }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.processData(this.data);
    }
  }

  /**
   * Agrupa y suma el valor total por día de salida.
   */
  private processData(tickets: TicketIngreso[]): void {
    const agrupado = new Map<string, number>();

    for (const ticket of tickets) {
      if (ticket.fechaSalida && ticket.valorTotal) {
        const fechaDia = ticket.fechaSalida.substring(0, 10);
        const valor = ticket.valorTotal;

        const ingresoActual = agrupado.get(fechaDia) || 0;
        agrupado.set(fechaDia, ingresoActual + valor);
      }
    }

    this.processedData = Array.from(agrupado.entries()).map(([fecha, ingresoTotal]) => ({
      fecha,
      ingresoTotal
    })).sort((a, b) => a.fecha.localeCompare(b.fecha));

    // Preparar datos para el chart
    this.lineChartData = {
      labels: this.processedData.map(d => d.fecha),
      datasets: [
        {
          data: this.processedData.map(d => d.ingresoTotal),
          label: 'Ingresos',
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.4)',
          tension: 0.2
        }
      ]
    };

    setTimeout(() => {
      this.chart?.render();
      this.chart?.update();
    }, 0);
  }
}
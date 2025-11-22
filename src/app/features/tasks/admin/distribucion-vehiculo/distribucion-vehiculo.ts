import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { BaseChartDirective } from 'ng2-charts';
import { Chart as ChartJS, registerables, ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { TicketIngreso } from '../../../../core/interfaces/data'; 

ChartJS.register(...registerables);

interface DistribucionData {
  tipoVehiculo: string;
  ingresoTotal: number;
  porcentaje: number;
}

@Component({
  selector: 'app-distribucion-vehiculo',
  standalone: true, 
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './distribucion-vehiculo.html',
  styleUrls: ['./distribucion-vehiculo.css']
})
export class DistribucionVehiculo implements OnChanges {

  @Input() data: TicketIngreso[] = [];

  processedData: DistribucionData[] = [];
  totalIngresos: number = 0;

  // Propiedades para Chart.js
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = { 
    labels: [],
    datasets: [{ data: [] }]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'right', 
      },
      title: {
        display: false,
      }
    }
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('DistribucionVehiculo - ngOnChanges, data:', this.data);
      this.processData(this.data || []);
    }
  }

  /**
   * Procesa la data cruda de tickets para calcular los ingresos por tipo de vehículo.
   */
  private processData(tickets: TicketIngreso[]): void {
    const grouped = new Map<string, number>();
    this.totalIngresos = 0;
    
    // Agrupación y suma de ingresos
    for (const ticket of tickets) {
      const value = ticket.valorTotal ?? 0; 
      this.totalIngresos += value;
      
      const type = ticket.tipoVehiculo;
      const currentRevenue = grouped.get(type) || 0;
      grouped.set(type, currentRevenue + value);
    }

    this.processedData = Array.from(grouped.entries()).map(([tipoVehiculo, ingresoTotal]) => {
      return {
        tipoVehiculo,
        ingresoTotal,
        porcentaje: (this.totalIngresos > 0) ? (ingresoTotal / this.totalIngresos) * 100 : 0 
      };
    }).sort((a, b) => b.ingresoTotal - a.ingresoTotal);
    
    this.doughnutChartLabels = this.processedData.map(d => d.tipoVehiculo);

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.processedData.map(d => d.ingresoTotal),
          backgroundColor: this.generateColors(this.processedData.length),
          label: 'Ingresos'
        }
      ]
    };

    // Asegura que el canvas se vuelva a dibujar cuando los datos cambian
    setTimeout(() => {
      try {
        console.log('DistribucionVehiculo - updating chart, chart directive:', this.chart);
        const chartInstance = this.chart?.chart;
        console.log('DistribucionVehiculo - chart instance before render/update:', chartInstance);
        this.chart?.render();
        this.chart?.update();
        console.log('DistribucionVehiculo - chart instance after render/update:', this.chart?.chart);
      } catch (err) {
        console.error('DistribucionVehiculo - error updating chart:', err);
      }
    }, 0);
  }

  /** Función auxiliar para generar colores para el gráfico */
  private generateColors(count: number): string[] {
    const colors = [
      '#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#7E57C2', '#26C6DA', '#FFCA28', '#D4E157'
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }
}
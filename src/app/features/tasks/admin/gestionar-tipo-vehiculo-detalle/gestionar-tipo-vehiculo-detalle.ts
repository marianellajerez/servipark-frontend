import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, forkJoin, of, switchMap, catchError, EMPTY, tap, Subscription } from 'rxjs';
import { TipoVehiculo, TarifaResponse, TarifaCreate } from '../../../../core/interfaces/data';
import { TipoVehiculoService } from '../../../../core/services/tipo-vehiculo';
import { Tarifa } from '../../../../core/services/tarifa';
import { TarifaModal } from '../../../../shared/components/tarifa-modal/tarifa-modal';

@Component({
  selector: 'app-gestionar-tipo-vehiculo-detalle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TarifaModal
  ],
  templateUrl: './gestionar-tipo-vehiculo-detalle.html',
  styleUrls: ['./gestionar-tipo-vehiculo-detalle.css']
})
export class GestionarTipoVehiculoDetalle implements OnInit, OnDestroy {

  tipoVehiculo: TipoVehiculo | null = null;
  tarifas$: Observable<TarifaResponse[]> = of([]);
  
  editForm: FormGroup;
  isModalOpen = false;
  
  private currentTipoId: number = 0;
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tipoVehiculoService: TipoVehiculoService,
    private tarifaService: Tarifa
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id) {
          this.router.navigate(['/dashboard/admin/tipos-vehiculo']);
          return EMPTY;
        }
        this.currentTipoId = id;
        return this.loadData(id);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadData(id: number): Observable<any> {
    const tipoVehiculoRequest = this.tipoVehiculoService.getTipoVehiculoById(id);
    const tarifasRequest = this.tarifaService.getTarifaHistory(id);

    return forkJoin({
      tipo: tipoVehiculoRequest,
      tarifas: tarifasRequest
    }).pipe(
      tap(data => {
        this.tipoVehiculo = data.tipo;
        this.tarifas$ = of(data.tarifas);
        this.editForm.patchValue({ nombre: data.tipo.nombre });
      }),
      catchError(err => {
        console.error("Error cargando datos:", err);
        alert("No se pudo cargar la información del tipo de vehículo.");
        this.router.navigate(['/dashboard/admin/tipos-vehiculo']);
        return EMPTY;
      })
    );
  }

  handleUpdateNombre(): void {
    if (this.editForm.invalid || !this.tipoVehiculo) return;

    const { nombre } = this.editForm.value;
    this.tipoVehiculoService.updateTipoVehiculo(this.tipoVehiculo.idTipoVehiculo, { nombre }).subscribe({
      next: (updatedTipo) => {
        this.tipoVehiculo!.nombre = updatedTipo.nombre;
        alert("Nombre actualizado exitosamente.");
        this.editForm.markAsPristine();
      },
      error: (err: any) => alert(`Error: ${err.error.message || 'No se pudo actualizar el nombre.'}`)
    });
  }

  handleDeactivate(): void {
    if (!this.tipoVehiculo) return;
    if (confirm("¿Está seguro de que desea DESACTIVAR este tipo de vehículo?")) {
      this.tipoVehiculoService.deactivateTipoVehiculo(this.tipoVehiculo.idTipoVehiculo).subscribe({
        next: () => {
          this.tipoVehiculo!.activo = false;
          alert("Tipo de vehículo desactivado.");
        },
        error: (err: any) => alert("Error al desactivar.")
      });
    }
  }

  handleActivate(): void {
    if (!this.tipoVehiculo) return;
    if (confirm("¿Está seguro de que desea REACTIVAR este tipo de vehículo?")) {
      this.tipoVehiculoService.activateTipoVehiculo(this.tipoVehiculo.idTipoVehiculo).subscribe({
        next: () => {
          this.tipoVehiculo!.activo = true;
          alert("Tipo de vehículo reactivado.");
        },
        error: (err: any) => alert("Error al reactivar.")
      });
    }
  }

  handleCreateTarifa(formData: TarifaCreate): void {
    formData.idTipoVehiculo = this.currentTipoId;

    this.tarifaService.createTarifa(formData).subscribe({
      next: () => {
        this.loadData(this.currentTipoId).subscribe();
        this.closeModal();
      },
      error: (err: any) => alert(`Error: ${err.error.message || 'No se pudo crear la tarifa.'}`)
    });
  }

  openCreateModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
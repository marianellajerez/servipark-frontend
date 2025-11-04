import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTipoVehiculoDetalle } from './gestionar-tipo-vehiculo-detalle';

describe('GestionarTipoVehiculoDetalle', () => {
  let component: GestionarTipoVehiculoDetalle;
  let fixture: ComponentFixture<GestionarTipoVehiculoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarTipoVehiculoDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarTipoVehiculoDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

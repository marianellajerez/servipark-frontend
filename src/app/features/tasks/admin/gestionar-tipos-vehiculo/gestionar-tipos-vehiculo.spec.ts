import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTiposVehiculo } from './gestionar-tipos-vehiculo';

describe('GestionarTiposVehiculo', () => {
  let component: GestionarTiposVehiculo;
  let fixture: ComponentFixture<GestionarTiposVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarTiposVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarTiposVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

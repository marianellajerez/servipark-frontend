import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarVehiculo } from './ingresar-vehiculo';

describe('IngresarVehiculo', () => {
  let component: IngresarVehiculo;
  let fixture: ComponentFixture<IngresarVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionVehiculo } from './distribucion-vehiculo';

describe('DistribucionVehiculo', () => {
  let component: DistribucionVehiculo;
  let fixture: ComponentFixture<DistribucionVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribucionVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribucionVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

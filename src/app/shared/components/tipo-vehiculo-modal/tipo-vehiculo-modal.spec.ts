import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVehiculoModal } from './tipo-vehiculo-modal';

describe('TipoVehiculoModal', () => {
  let component: TipoVehiculoModal;
  let fixture: ComponentFixture<TipoVehiculoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoVehiculoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoVehiculoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

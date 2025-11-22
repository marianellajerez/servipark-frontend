import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendenciaIngresos } from './tendencia-ingresos';

describe('TendenciaIngresos', () => {
  let component: TendenciaIngresos;
  let fixture: ComponentFixture<TendenciaIngresos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendenciaIngresos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendenciaIngresos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

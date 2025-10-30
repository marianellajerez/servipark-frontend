import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEntrada } from './registrar-entrada';

describe('RegistrarEntrada', () => {
  let component: RegistrarEntrada;
  let fixture: ComponentFixture<RegistrarEntrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEntrada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEntrada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaModal } from './tarifa-modal';

describe('TarifaModal', () => {
  let component: TarifaModal;
  let fixture: ComponentFixture<TarifaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

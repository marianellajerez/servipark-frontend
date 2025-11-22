import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAvanzados } from './reportes-avanzados';

describe('ReportesAvanzados', () => {
  let component: ReportesAvanzados;
  let fixture: ComponentFixture<ReportesAvanzados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesAvanzados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesAvanzados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

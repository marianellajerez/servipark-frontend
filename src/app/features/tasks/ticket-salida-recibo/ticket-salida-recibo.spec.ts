import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalidaRecibo } from './ticket-salida-recibo';

describe('TicketSalidaRecibo', () => {
  let component: TicketSalidaRecibo;
  let fixture: ComponentFixture<TicketSalidaRecibo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSalidaRecibo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSalidaRecibo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

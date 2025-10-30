import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRecibo } from './ticket-recibo';

describe('TicketRecibo', () => {
  let component: TicketRecibo;
  let fixture: ComponentFixture<TicketRecibo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRecibo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRecibo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

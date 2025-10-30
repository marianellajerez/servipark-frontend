import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTicketActivo } from './ver-ticket-activo';

describe('VerTicketActivo', () => {
  let component: VerTicketActivo;
  let fixture: ComponentFixture<VerTicketActivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTicketActivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTicketActivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

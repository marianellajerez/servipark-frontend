import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistorialTickets } from './tabla-historial-tickets';

describe('TablaHistorialTickets', () => {
  let component: TablaHistorialTickets;
  let fixture: ComponentFixture<TablaHistorialTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaHistorialTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaHistorialTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

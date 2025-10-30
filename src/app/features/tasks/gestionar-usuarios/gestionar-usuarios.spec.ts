import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUsuarios } from './gestionar-usuarios';

describe('GestionarUsuarios', () => {
  let component: GestionarUsuarios;
  let fixture: ComponentFixture<GestionarUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

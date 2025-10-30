import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrarParqueo } from './cobrar-parqueo';

describe('CobrarParqueo', () => {
  let component: CobrarParqueo;
  let fixture: ComponentFixture<CobrarParqueo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobrarParqueo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobrarParqueo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

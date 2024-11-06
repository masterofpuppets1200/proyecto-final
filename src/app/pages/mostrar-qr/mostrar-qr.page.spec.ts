import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarQRPage } from './mostrar-qr.page';

describe('MostrarQRPage', () => {
  let component: MostrarQRPage;
  let fixture: ComponentFixture<MostrarQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

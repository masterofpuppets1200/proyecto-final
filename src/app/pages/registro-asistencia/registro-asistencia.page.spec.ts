import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaQrPage } from './registro-asistencia.page';

describe('RegistroAsistenciaPage', () => {
  let component: AsistenciaQrPage;
  let fixture: ComponentFixture<AsistenciaQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ClaseProcesoService } from './clase-proceso.service';

describe('ClaseProcesoService', () => {
  let service: ClaseProcesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseProcesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

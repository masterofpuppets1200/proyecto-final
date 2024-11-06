import { TestBed } from '@angular/core/testing';

import { CrudloginService } from './crudlogin.service';

describe('CrudloginService', () => {
  let service: CrudloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CurdAPIService } from './curd-api.service';

describe('CurdAPIService', () => {
  let service: CurdAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurdAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

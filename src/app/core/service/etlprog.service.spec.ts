import { TestBed } from '@angular/core/testing';

import { EtlprogService } from './etlprog.service';

describe('EtlprogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtlprogService = TestBed.get(EtlprogService);
    expect(service).toBeTruthy();
  });
});

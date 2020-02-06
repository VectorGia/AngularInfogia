import { TestBed } from '@angular/core/testing';

import { ProformaService } from './proforma.service';

describe('ProformaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProformaService = TestBed.get(ProformaService);
    expect(service).toBeTruthy();
  });
});

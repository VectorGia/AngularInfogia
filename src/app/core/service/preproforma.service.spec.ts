import { TestBed } from '@angular/core/testing';

import { PreproformaService } from './preproforma.service';

describe('PreproformaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreproformaService = TestBed.get(PreproformaService);
    expect(service).toBeTruthy();
  });
});

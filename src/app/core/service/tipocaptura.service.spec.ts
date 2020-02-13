import { TestBed } from '@angular/core/testing';

import { TipocapturaService } from './tipocaptura.service';

describe('TipocapturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipocapturaService = TestBed.get(TipocapturaService);
    expect(service).toBeTruthy();
  });
});

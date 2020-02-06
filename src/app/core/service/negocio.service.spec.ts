import { TestBed } from '@angular/core/testing';

import { NegocioService } from './negocio.service';

describe('NegocioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NegocioService = TestBed.get(NegocioService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MonedaService } from './moneda.service';

describe('MonedaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonedaService = TestBed.get(MonedaService);
    expect(service).toBeTruthy();
  });
});

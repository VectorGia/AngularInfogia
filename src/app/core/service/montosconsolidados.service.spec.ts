import { TestBed } from '@angular/core/testing';

import { MontosconsolidadosService } from './montosconsolidados.service';

describe('MontosconsolidadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MontosconsolidadosService = TestBed.get(MontosconsolidadosService);
    expect(service).toBeTruthy();
  });
});

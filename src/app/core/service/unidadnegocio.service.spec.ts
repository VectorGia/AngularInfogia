import { TestBed } from '@angular/core/testing';

import { UnidadnegocioService } from './unidadnegocio.service';

describe('UnidadnegocioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadnegocioService = TestBed.get(UnidadnegocioService);
    expect(service).toBeTruthy();
  });
});

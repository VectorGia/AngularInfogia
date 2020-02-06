import { TestBed } from '@angular/core/testing';

import { RelacionesCatalogoService } from './relaciones-catalogo.service';

describe('RelacionesCatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelacionesCatalogoService = TestBed.get(RelacionesCatalogoService);
    expect(service).toBeTruthy();
  });
});

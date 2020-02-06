import { TestBed } from '@angular/core/testing';

import { RelacionesService } from './relaciones.service';

describe('RelacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelacionesService = TestBed.get(RelacionesService);
    expect(service).toBeTruthy();
  });
});

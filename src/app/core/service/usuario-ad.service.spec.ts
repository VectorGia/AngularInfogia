import { TestBed } from '@angular/core/testing';

import { UsuarioADService } from './usuario-ad.service';

describe('UsuarioADService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioADService = TestBed.get(UsuarioADService);
    expect(service).toBeTruthy();
  });
});

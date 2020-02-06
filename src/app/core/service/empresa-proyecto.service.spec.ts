import { TestBed } from '@angular/core/testing';

import { EmpresaProyectoService } from './empresa-proyecto.service';

describe('EmpresaProyectoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresaProyectoService = TestBed.get(EmpresaProyectoService);
    expect(service).toBeTruthy();
  });
});

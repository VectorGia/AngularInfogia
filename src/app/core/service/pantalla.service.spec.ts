import { TestBed } from '@angular/core/testing';

import { PantallaService } from './pantalla.service';

describe('PantallaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PantallaService = TestBed.get(PantallaService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RelmodeloService } from './relmodelo.service';

describe('RelmodeloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelmodeloService = TestBed.get(RelmodeloService);
    expect(service).toBeTruthy();
  });
});

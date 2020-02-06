import { TestBed } from '@angular/core/testing';

import { RubroService } from './rubro.service';

describe('RubroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubroService = TestBed.get(RubroService);
    expect(service).toBeTruthy();
  });
});

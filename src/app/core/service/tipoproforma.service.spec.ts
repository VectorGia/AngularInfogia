import { TestBed } from '@angular/core/testing';

import { TipoproformaService } from './tipoproforma.service';

describe('TipoproformaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoproformaService = TestBed.get(TipoproformaService);
    expect(service).toBeTruthy();
  });
});

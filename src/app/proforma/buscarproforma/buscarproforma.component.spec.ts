import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarproformaComponent } from './buscarproforma.component';

describe('BuscarproformaComponent', () => {
  let component: BuscarproformaComponent;
  let fixture: ComponentFixture<BuscarproformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarproformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarproformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

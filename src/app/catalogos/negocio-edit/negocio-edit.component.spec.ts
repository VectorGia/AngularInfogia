import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioEditComponent } from './negocio-edit.component';

describe('NegocioEditComponent', () => {
  let component: NegocioEditComponent;
  let fixture: ComponentFixture<NegocioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegocioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

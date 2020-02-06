import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostosEditComponent } from './centro-costos-edit.component';

describe('CentroCostosEditComponent', () => {
  let component: CentroCostosEditComponent;
  let fixture: ComponentFixture<CentroCostosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

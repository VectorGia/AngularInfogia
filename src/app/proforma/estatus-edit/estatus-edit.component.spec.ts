import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusEditComponent } from './estatus-edit.component';

describe('EstatusEditComponent', () => {
  let component: EstatusEditComponent;
  let fixture: ComponentFixture<EstatusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

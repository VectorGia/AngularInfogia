import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosEditComponent } from './rubros-edit.component';

describe('RubrosEditComponent', () => {
  let component: RubrosEditComponent;
  let fixture: ComponentFixture<RubrosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubrosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

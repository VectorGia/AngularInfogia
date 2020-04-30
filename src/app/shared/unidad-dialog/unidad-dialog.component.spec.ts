import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadDialogComponent } from './unidad-dialog.component';

describe('UnidadDialogComponent', () => {
  let component: UnidadDialogComponent;
  let fixture: ComponentFixture<UnidadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

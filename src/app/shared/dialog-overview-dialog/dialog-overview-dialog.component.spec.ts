import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewDialogComponent } from './dialog-overview-dialog.component';

describe('DialogOverviewDialogComponent', () => {
  let component: DialogOverviewDialogComponent;
  let fixture: ComponentFixture<DialogOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

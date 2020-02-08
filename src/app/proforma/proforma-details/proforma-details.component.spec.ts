import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaDetailsComponent } from './proforma-details.component';

describe('ProformaDetailsComponent', () => {
  let component: ProformaDetailsComponent;
  let fixture: ComponentFixture<ProformaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

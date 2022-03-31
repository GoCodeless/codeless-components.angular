import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyFormComponent } from './appify-form.component';

describe('AppifyFormComponent', () => {
  let component: AppifyFormComponent;
  let fixture: ComponentFixture<AppifyFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

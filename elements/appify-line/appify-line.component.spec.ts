import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyLineComponent } from './appify-line.component';

describe('AppifyLineComponent', () => {
  let component: AppifyLineComponent;
  let fixture: ComponentFixture<AppifyLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

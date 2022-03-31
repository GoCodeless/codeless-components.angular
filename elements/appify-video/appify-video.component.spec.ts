import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyVideoComponent } from './appify-video.component';

describe('AppifyVideoComponent', () => {
  let component: AppifyVideoComponent;
  let fixture: ComponentFixture<AppifyVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

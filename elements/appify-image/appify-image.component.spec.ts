import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyImageComponent } from './appify-image.component';

describe('AppifyImageComponent', () => {
  let component: AppifyImageComponent;
  let fixture: ComponentFixture<AppifyImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

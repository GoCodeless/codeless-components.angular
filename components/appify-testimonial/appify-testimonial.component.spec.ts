import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyTestimonialComponent } from './appify-testimonial.component';

describe('AppifyTestimonialComponent', () => {
  let component: AppifyTestimonialComponent;
  let fixture: ComponentFixture<AppifyTestimonialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyTestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

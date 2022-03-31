import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyCarouselComponent } from './appify-carousel.component';

describe('AppifyCarouselComponent', () => {
  let component: AppifyCarouselComponent;
  let fixture: ComponentFixture<AppifyCarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

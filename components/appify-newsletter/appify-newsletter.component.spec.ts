import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyNewsletterComponent } from './appify-newsletter.component';

describe('AppifyNewsletterComponent', () => {
  let component: AppifyNewsletterComponent;
  let fixture: ComponentFixture<AppifyNewsletterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

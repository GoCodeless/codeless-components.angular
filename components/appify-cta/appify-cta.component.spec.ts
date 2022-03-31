import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyCtaComponent } from './appify-cta.component';

describe('AppifyCtaComponent', () => {
  let component: AppifyCtaComponent;
  let fixture: ComponentFixture<AppifyCtaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

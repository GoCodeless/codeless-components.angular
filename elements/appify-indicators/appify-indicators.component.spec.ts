import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyIndicatorsComponent } from './appify-indicators.component';

describe('AppifyIndicatorsComponent', () => {
  let component: AppifyIndicatorsComponent;
  let fixture: ComponentFixture<AppifyIndicatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

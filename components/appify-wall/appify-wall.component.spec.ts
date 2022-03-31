import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyWallComponent } from './appify-wall.component';

describe('AppifyWallComponent', () => {
  let component: AppifyWallComponent;
  let fixture: ComponentFixture<AppifyWallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

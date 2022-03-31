import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppifyTextComponent } from './appify-text.component';

describe('AppifyTextComponent', () => {
  let component: AppifyTextComponent;
  let fixture: ComponentFixture<AppifyTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppifyTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppifyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

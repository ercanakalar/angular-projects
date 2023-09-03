import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasZoomInOutComponent } from './canvas-zoom-in-out.component';

describe('CanvasZoomInOutComponent', () => {
  let component: CanvasZoomInOutComponent;
  let fixture: ComponentFixture<CanvasZoomInOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasZoomInOutComponent]
    });
    fixture = TestBed.createComponent(CanvasZoomInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

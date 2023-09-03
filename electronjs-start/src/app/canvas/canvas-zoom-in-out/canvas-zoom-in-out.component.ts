import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-zoom-in-out',
  templateUrl: './canvas-zoom-in-out.component.html',
  styleUrls: ['./canvas-zoom-in-out.component.css'],
})
export class CanvasZoomInOutComponent {
  @ViewChild('canvasEl', { static: true })
  private canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  private context: CanvasRenderingContext2D | null = null;

  private zoomFactor: number = 1.0;
  private minZoom: number = 0.2;
  private maxZoom: number = 5.0;

  constructor() {
    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  ngAfterViewInit(): void {
    this.context = this.canvasRef?.nativeElement.getContext('2d')!;
  }

  onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    console.log(event, 'event');

    this.zoomFactor += event.deltaY * -0.001;

    this.zoomFactor = Math.min(
      Math.max(this.zoomFactor, this.minZoom),
      this.maxZoom
    );

    this.updateCanvasZoom();
    this.updateDivZoom();
  }

  updateCanvasZoom(): void {
    this.context?.clearRect(
      0,
      0,
      this.canvasRef?.nativeElement.width!,
      this.canvasRef?.nativeElement.height!
    );

    this.context?.scale(this.zoomFactor, this.zoomFactor);
  }
  updateDivZoom(): void {
    const zoomableDiv = document.querySelector('.zoomable-div') as HTMLElement;
    zoomableDiv.style.transform = `scale(${this.zoomFactor})`;
  }
}

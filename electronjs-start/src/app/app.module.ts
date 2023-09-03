import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasZoomInOutComponent } from './canvas/canvas-zoom-in-out/canvas-zoom-in-out.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasZoomInOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

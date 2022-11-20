import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PickOfficeComponent } from './pick-office/pick-office.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasPageComponent,
    PickOfficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

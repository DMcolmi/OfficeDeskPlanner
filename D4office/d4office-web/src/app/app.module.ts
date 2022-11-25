import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { PickOfficeComponent } from './pick-office/pick-office.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    AppComponent, 
    CanvasPageComponent,
    PickOfficeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    NgxMultipleDatesModule, 
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

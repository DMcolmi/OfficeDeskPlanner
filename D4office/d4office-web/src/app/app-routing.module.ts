import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { CanvasPanTestComponent } from './canvas-pan-test/canvas-pan-test.component';
import { PickOfficeComponent } from './pick-office/pick-office.component';

const routes: Routes = [
  { path: '', component: PickOfficeComponent},
  { path: 'desks', component: CanvasPageComponent},
  { path: 'pan', component: CanvasPanTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

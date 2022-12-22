import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasPageComponent } from './canvas-page/canvas-page.component';
import { CanvasPanTestComponent } from './canvas-pan-test/canvas-pan-test.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PickOfficeComponent } from './pick-office/pick-office.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'offices', component: LandingPageComponent},
  { path: 'desks/:officeId', component: CanvasPageComponent},
  { path: 'pan', component: CanvasPanTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

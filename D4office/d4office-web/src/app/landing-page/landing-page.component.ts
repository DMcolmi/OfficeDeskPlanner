import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasPageComponent } from '../canvas-page/canvas-page.component';
import { Office } from '../office';
import { OfficeService } from '../office.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private officeService: OfficeService,
    private route: Router) { }  
  
  offices: Office[];

  selectedOffice: Office;

  ngOnInit(): void {
    this.officeService.getOffices().subscribe(
      {
        next: officesCof => {this.offices = officesCof},
        complete: () => {}
      }
    )
  }

  onOfficePicked(){
    this.route.navigate(["/desks", this.selectedOffice.officeId]);
  }
}

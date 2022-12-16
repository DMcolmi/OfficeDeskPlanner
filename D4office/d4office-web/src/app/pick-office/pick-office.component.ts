import { Component, Input, OnInit } from '@angular/core';
import { Office } from '../office';
import { OfficeService } from '../office.service';

@Component({
  selector: 'app-pick-office',
  templateUrl: './pick-office.component.html',
  styleUrls: ['./pick-office.component.css']
})
export class PickOfficeComponent implements OnInit {

  @Input() selectedOffice: Office;

  constructor(private officeService: OfficeService) { }
  
  offices: Office[];

  ngOnInit(): void {

    this.officeService.getOffices().subscribe(
      {
        next: officesCof => {this.offices = officesCof},
        complete: () => {console.log(this.offices);
        }
      }
    )


  }

}

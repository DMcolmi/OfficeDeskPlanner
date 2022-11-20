import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOfficeComponent } from './pick-office.component';

describe('PickOfficeComponent', () => {
  let component: PickOfficeComponent;
  let fixture: ComponentFixture<PickOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

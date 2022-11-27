import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPanTestComponent } from './canvas-pan-test.component';

describe('CanvasPanTestComponent', () => {
  let component: CanvasPanTestComponent;
  let fixture: ComponentFixture<CanvasPanTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasPanTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasPanTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

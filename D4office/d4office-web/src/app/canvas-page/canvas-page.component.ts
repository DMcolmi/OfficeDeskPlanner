import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MultipleDatesComponent } from 'ngx-multiple-dates';
import { CanvasDesk } from '../canvasDesk';
import { DesksServiceService } from '../desks-service.service';
import { Reservation } from '../reservation';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-canvas-page',
  templateUrl: './canvas-page.component.html',
  styleUrls: ['./canvas-page.component.css']
})
export class CanvasPageComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>

  @ViewChild('canvasCard', { static: true })
  canvasCard: ElementRef

  image = new Image();
  ctx: CanvasRenderingContext2D;
  private winH: number;
  private winW: number;
  private imgW: number;
  deskListRelativePosition = new Array<CanvasDesk>();
  bookableDesks = new Array<CanvasDesk>();
  modelDatePicker = new Array<Date>();
  model: any;
  selectedDesk: CanvasDesk | null;

  constructor(private desksService: DesksServiceService, public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.image.src = "../../assets/images/piantaMilano.svg";
    this.imgW = 2000;
    this.winH = 1000;
    var cardBound = this.canvasCard.nativeElement.getBoundingClientRect();
    this.winW = (cardBound.right - cardBound.left) * .96;
    this.canvas.nativeElement.height = this.winH;
    this.canvas.nativeElement.width = this.winW;

    this.ctx = this.canvas.nativeElement!.getContext("2d")!;    
    this.ctx.globalAlpha = 0.7;

    this.drawDesksAndPlan();

    window.addEventListener("resize", () => {
      window.location.reload();
    })

    this.canvas.nativeElement.addEventListener('click', (event) => {
      this.clearCanvas();
      const canvasRelavitveBound = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - canvasRelavitveBound.left;
      const y = event.clientY - canvasRelavitveBound.top;
      var isSelected: boolean = false;

      this.deskListRelativePosition.forEach(desk => {        
        if (desk.click(x, y)) {
          isSelected = true;
          this.selectedDesk = desk;          
        }
      });
      if(!isSelected && this.selectedDesk != null){
        this.selectedDesk!.click(this.selectedDesk!.xpos, this.selectedDesk!.ypos);
      }
       this.drawPlan();
    })
  }

  onSelectedDeskFromDropdown() {
    console.log(this.selectedDesk);
    this.clearCanvas();
    this.deskListRelativePosition.forEach(desk => {
      desk.click(0, 0);
    });

    this.selectedDesk!.click(this.selectedDesk!.xpos, this.selectedDesk!.ypos);
    this.drawPlan();
  }

  private drawPlan(){
    this.ctx.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);    
  }

  private clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  drawDesksAndPlan() {
    if (this.modelDatePicker.length > 0){
      this.drawReservableDeskForSelectedDays();
    } else {
      this.drawDeskConfiguration();
    }
  }

  private drawReservableDeskForSelectedDays() {
    this.desksService.getReservableDeskForSelectedDays(this.modelDatePicker).subscribe({
      next: reservableDesks => {
        this.clearCanvas();

        reservableDesks.forEach(deskConf => {
          let desk = this.drawDesk(deskConf);
          if (deskConf.canBeReserved && !deskConf.isReserved)
            this.bookableDesks.push(desk);
        });

        this.drawPlan();

      },
      error: (e) => console.log('error: ', e),
      complete: () => console.log('drawReservableDeskForSelectedDays finish')
    });
  }

  private drawDeskConfiguration() {
    this.desksService.getDesksConf('MI').subscribe({
      next: (desksConf) => {

        this.clearCanvas();

        var deskListAbsolutePosition = desksConf;

        deskListAbsolutePosition.forEach(deskConf => {
          this.drawDesk(deskConf);
        });

        this.bookableDesks = new Array;
      },
      error: (e) => console.log('error: ', e),
      complete: () => {
        this.drawPlan();
        console.log('drawDeskConfiguration finish');
      }
    });
  }

  private drawDesk(deskConf: CanvasDesk) {
    let desk = new CanvasDesk(this.imgW * deskConf.xpos / 20, this.imgW * deskConf.ypos / 20, this.imgW * .004, deskConf.deskNo, deskConf.canBeReserved, deskConf.isReserved, deskConf.officeId);
    desk.draw(this.ctx);
    this.deskListRelativePosition.push(desk);
    return desk;
  }

  bookDesks() {
    var desks = new Array<CanvasDesk>();
    desks.push(this.selectedDesk!);
    var reservation = new Reservation(desks, this.modelDatePicker, "prova@gmail.com")

    this.desksService.bookDesks(reservation).subscribe({
      next: (result) => { console.log(result) },
      error: (e) => console.log('error: ', e),
      complete: () => {
        
        let snackBarRef = this.snackBar.open( 'Thanks! Your reservation is confirmed',"Ok", {duration: 2000});
        this.modelDatePicker = new Array<Date>();
        this.selectedDesk = null;
        this.drawDesksAndPlan()
      }
    })    
  }
}


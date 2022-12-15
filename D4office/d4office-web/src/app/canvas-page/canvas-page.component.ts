import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MultipleDatesComponent } from 'ngx-multiple-dates';
import { CanvasDesk } from '../canvasDesk';
import { DesksServiceService } from '../desks-service.service';
import { Reservation } from '../reservation';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Office } from '../office';


@Component({
  selector: 'app-canvas-page',
  templateUrl: './canvas-page.component.html',
  styleUrls: ['./canvas-page.component.css']
})
export class CanvasPageComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement>

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
  office: Office = new Office();

  //pan and zoom stuff
  canvas: HTMLCanvasElement;
  cameraOffset: { x: number, y: number };
  previousCameraOffset: { x: number, y: number };
  isDragging = false;
  dragStart: { x: number, y: number } = { x: 0, y: 0 };
  cameraZoom = 1;
  MAX_ZOOM = 2.5;
  MIN_ZOOM = .5;
  SCROLL_SENSITIVITY = 0.001;
  translationX = 0;
  translationY = 0;


  constructor(private desksService: DesksServiceService, public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.initOffice();
    this.image.src = "../../assets/images/piantaMilano.svg";
    this.imgW = 2000;
    this.winH = 550;
    this.canvas = this.canvasRef.nativeElement;
    var cardBound = this.canvasCard.nativeElement.getBoundingClientRect();
    this.winW = (cardBound.right - cardBound.left) * .96;
    this.canvas.height = this.winH;
    this.canvas.width = this.winW;

    //pan and zoom stuff
    this.cameraOffset = { x: this.winW / 2, y: this.winH / 2 };
    this.previousCameraOffset = { x: 0, y: 0 };
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => this.onPonterDown(e));
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => this.onPointerUp(e));
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => this.onPointerMove(e));
    this.canvas.addEventListener('wheel', (e: WheelEvent) => {
      this.adjustZoom(e.deltaY * this.SCROLL_SENSITIVITY);
      e.preventDefault();
    });


    this.ctx = this.canvas!.getContext("2d")!;    
    this.ctx.globalAlpha = 0.7;

    this.drawDesksAndPlan();

    window.addEventListener("resize", () => {
      window.location.reload();
    })  

    this.canvasRef.nativeElement.addEventListener('click', (event) => {
      this.clearCanvas();
      const canvasRelavitveBound = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = ((event.clientX- canvasRelavitveBound.left - this.winW / 2)/this.cameraZoom) + (+this.winW / 2 - this.translationX);
      const y = ((event.clientY- canvasRelavitveBound.top - this.winH / 2)/this.cameraZoom) + (+this.winH / 2 - this.translationY);
      
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

    this.draw();
  }

  private initOffice() {
    this.desksService.getOfficeById("MI").subscribe(
      {
        next: officeDto => { this.office = officeDto; },
        complete: () => { console.log(this.office); }
      }
    );
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
    this.ctx.drawImage(this.image, -this.winW / 2 , -this.winH / 2 -400, this.imgW, this.imgW * 0.5);    
  }

  private clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.ctx.globalAlpha = 0.7;
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

        this.deskListRelativePosition = new Array<CanvasDesk>;
        this.bookableDesks = new Array<CanvasDesk>;

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
        this.deskListRelativePosition = new Array<CanvasDesk>;
        this.bookableDesks = new Array<CanvasDesk>;

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
    let desk = new CanvasDesk((this.imgW * deskConf.xpos / 20) - this.winW / 2 , (this.imgW * deskConf.ypos / 20 ) - this.winH / 2 -400, this.imgW * .004, deskConf.deskNo, deskConf.canBeReserved, deskConf.isReserved, deskConf.officeId);
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

  redrowPanAndDesk() {
    this.clearCanvas();
    this.deskListRelativePosition.forEach(desk => {
      desk.draw(this.ctx);
    });

    this.selectedDesk?.click(this.selectedDesk!.xpos, this.selectedDesk!.ypos);
    this.drawPlan();
  }


  //pan and zoom stuff

  public draw() {

    //reset canvas dimension after last iteration
    this.canvas.width = this.winW;
    this.canvas.height = this.winH;

    //translate to the canvas centre before zooming
    this.ctx.translate(this.winW / 2, this.winH / 2);
    //zooming
    this.ctx.scale(this.cameraZoom, this.cameraZoom);
    //translate
    this.ctx.translate(-this.winW / 2 + this.cameraOffset.x, -this.winH / 2 + this.cameraOffset.y);

    this.translationX =+ this.cameraOffset.x;
    this.translationY =+ this.cameraOffset.y;

    this.ctx.clearRect(0, 0, this.winW, this.winH);

    //parte che disegna    
    this.redrowPanAndDesk();
    //fine parte che disegna


    //fine parte che disegna
    requestAnimationFrame(() => this.draw());
  }


  onPonterDown(e: MouseEvent) {
    this.isDragging = true;
    this.dragStart.x = getEventLocation(e, this.canvas).x/this.cameraZoom - this.cameraOffset.x;
    this.dragStart.y = getEventLocation(e, this.canvas).y/this.cameraZoom - this.cameraOffset.y;
  }

  onPointerUp(e: MouseEvent) {
    this.isDragging = false;
    this.canvas.style.cursor = 'default';
  }

  onPointerMove(e: MouseEvent) {
    if (this.isDragging) {
      this.canvas.style.cursor = 'move';
      this.cameraOffset.x = (getEventLocation(e, this.canvas).x/this.cameraZoom - (this.dragStart.x));
      this.cameraOffset.y = (getEventLocation(e, this.canvas).y/this.cameraZoom - (this.dragStart.y));
    }
  }

  adjustZoom(zoomAmount: number) {
    if (!this.isDragging) {
      this.cameraZoom += zoomAmount;
      this.cameraZoom = Math.min(this.cameraZoom, this.MAX_ZOOM);
      this.cameraZoom = Math.max(this.cameraZoom, this.MIN_ZOOM);
    }
  }


}

function getEventLocation(e: MouseEvent, canvas: HTMLCanvasElement): any {
  if (e.clientX && e.clientY) {
    const canvasRelavitveBound = canvas.getBoundingClientRect();
    return { x: e.clientX - canvasRelavitveBound.left, y: e.clientY - canvasRelavitveBound.top };
  }
}
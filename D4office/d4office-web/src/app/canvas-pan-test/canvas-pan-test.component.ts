import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasDesk } from '../canvasDesk';
import { DesksServiceService } from '../desks-service.service';

@Component({
  selector: 'app-canvas-pan-test',
  templateUrl: './canvas-pan-test.component.html',
  styleUrls: ['./canvas-pan-test.component.css']
})
export class CanvasPanTestComponent implements OnInit {

  @ViewChild('canvasPan', { static: true })
  canvasPan: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cameraOffset: { x: number, y: number };
  previousCameraOffset: { x: number, y: number };
  isDragging = false;
  dragStart: { x: number, y: number } = { x: 0, y: 0 };
  cameraZoom = 1;
  MAX_ZOOM = 3;
  MIN_ZOOM = .5;
  SCROLL_SENSITIVITY = 0.001;

  //drawing stuff
  image = new Image();
  private imgW: number;  
  bookableDesks = new Array<CanvasDesk>();  
  deskListRelativePosition = new Array<CanvasDesk>();
  selectedDesk: CanvasDesk | null;

  constructor(private desksService: DesksServiceService) {
  }

  ngOnInit(): void {
    this.canvas = this.canvasPan.nativeElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cameraOffset = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.previousCameraOffset = { x: 0, y: 0 };
    this.image.src = "../../assets/images/piantaMilano.svg";
    this.imgW = 2000;


    this.canvas.addEventListener('mousedown', (e: MouseEvent) => this.onPonterDown(e));
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => this.onPointerUp(e));
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => this.onPointerMove(e));
    this.canvas.addEventListener('wheel', (e: WheelEvent) => this.adjustZoom(e.deltaY * this.SCROLL_SENSITIVITY));

    this.drawDeskConfiguration();

    this.draw();
  }

  public draw() {
    //reset canvas dimension after last iteration
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    //translate to the canvas centre before zooming
    this.ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    //zooming
    this.ctx.scale(this.cameraZoom, this.cameraZoom);
    //translate
    this.ctx.translate(-window.innerWidth / 2 + this.cameraOffset.x, -window.innerHeight / 2 + this.cameraOffset.y);

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //parte che disegna    
    this.redrowPanAndDesk();
    //fine parte che disegna


    //fine parte che disegna
    requestAnimationFrame(() => this.draw());
  }

  onPonterDown(e: MouseEvent) {
    this.isDragging = true;
    this.dragStart.x = getEventLocation(e, this.canvas).x - this.cameraOffset.x;
    this.dragStart.y = getEventLocation(e, this.canvas).y - this.cameraOffset.y;
  }

  onPointerUp(e: MouseEvent) {
    this.isDragging = false;
  }

  onPointerMove(e: MouseEvent) {
    if (this.isDragging) {
      this.cameraOffset.x = (getEventLocation(e, this.canvas).x - (this.dragStart.x));
      this.cameraOffset.y = (getEventLocation(e, this.canvas).y - (this.dragStart.y));
    }
  }

  adjustZoom(zoomAmount: number) {
    if (!this.isDragging) {
      this.cameraZoom += zoomAmount;
      this.cameraZoom = Math.min(this.cameraZoom, this.MAX_ZOOM);
      this.cameraZoom = Math.max(this.cameraZoom, this.MIN_ZOOM);
    }
  }

  //drawing stuff

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

  private drawPlan(){
    this.ctx.drawImage(this.image, -window.innerWidth / 2 , -window.innerHeight / 2 , this.imgW, this.imgW * 0.5);    
  }

  private drawDesk(deskConf: CanvasDesk) {
    let desk = new CanvasDesk((this.imgW * deskConf.xpos / 20) - window.innerWidth / 2 , (this.imgW * deskConf.ypos / 20 ) - window.innerHeight / 2 , this.imgW * .004, deskConf.deskNo, deskConf.canBeReserved, deskConf.isReserved, deskConf.officeId);
    desk.draw(this.ctx);
    this.deskListRelativePosition.push(desk);
    return desk;
  }

  private clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  redrowPanAndDesk() {
    this.clearCanvas();
    this.deskListRelativePosition.forEach(desk => {
      desk.draw(this.ctx);
    });

    this.selectedDesk?.click(this.selectedDesk!.xpos, this.selectedDesk!.ypos);
    this.drawPlan();
  }
}

function getEventLocation(e: MouseEvent, canvas: HTMLCanvasElement): any {
  if (e.clientX && e.clientY) {
    const canvasRelavitveBound = canvas.getBoundingClientRect();
    return { x: e.clientX - canvasRelavitveBound.left, y: e.clientY - canvasRelavitveBound.top };
  }
}

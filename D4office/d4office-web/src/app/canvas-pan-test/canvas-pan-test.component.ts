import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  cameraOffset: {x: number, y: number};
  previousCameraOffset: {x: number, y: number};
  isDragging = false;  
  dragStart: {x: number, y: number} = {x: 0, y: 0};
  cameraZoom = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.canvas = this.canvasPan.nativeElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    //this.cameraOffset =  { x: window.innerWidth/2, y: window.innerHeight/2 };
    this.cameraOffset =  { x: 0, y: 0 };
    this.previousCameraOffset =  { x: 0, y: 0 };


    this.canvas.addEventListener('mousedown', (e: MouseEvent) => this.onPonterDown(e));
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => this.onPointerUp(e));
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => this.onPointerMove(e));

    this.draw();
  }

  public draw() { 
    
    //this.ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
    this.ctx.scale(this.cameraZoom, this.cameraZoom);
    //this.ctx.translate( -window.innerWidth / 2 + this.cameraOffset.x, -window.innerHeight / 2 + this.cameraOffset.y );
    
    {
      if(this.cameraOffset.x != 0 && this.cameraOffset.y !=0)
        this.ctx.translate(this.cameraOffset.x -this.previousCameraOffset.x , this.cameraOffset.y -this.previousCameraOffset.y);
      
       this.previousCameraOffset.x = this.cameraOffset.x;
       this.previousCameraOffset.y = this.cameraOffset.y;
    }

    this.cameraOffset.x = 0;
    this.cameraOffset.y = 0;
    
    
    this.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    //parte che disegna    
    this.ctx.font = "50px Verdana";
    this.ctx.fillText("Big smile! Move me!", 100, 100);
    
    //fine parte che disegna
    requestAnimationFrame(() => this.draw());    
  }

  onPonterDown(e: MouseEvent){

    this.isDragging = true;
    this.dragStart.x = getEventLocation(e, this.canvas).x;
    this.dragStart.y = getEventLocation(e, this.canvas).y;
  }

  onPointerUp(e: MouseEvent){
    this.isDragging = false;    
  }

  onPointerMove(e: MouseEvent){
    if(this.isDragging){
      this.cameraOffset.x = (getEventLocation(e, this.canvas).x - (this.dragStart.x));
      this.cameraOffset.y = (getEventLocation(e, this.canvas).y - (this.dragStart.y));
     }
  }
}

function getEventLocation(e: MouseEvent, canvas: HTMLCanvasElement): any{
  if(e.clientX && e.clientY){
    const canvasRelavitveBound = canvas.getBoundingClientRect();
    return {x: e.clientX - canvasRelavitveBound.left, y: e.clientY - canvasRelavitveBound.top};      
  }
}

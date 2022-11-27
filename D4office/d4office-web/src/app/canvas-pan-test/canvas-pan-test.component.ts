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
  ctx: CanvasRenderingContext2D;  
  cameraOffset: {x: number, y: number};
  previousCameraOffset: {x: number, y: number};
  isDragging = false;  
  dragStart: {x: number, y: number} = {x: 0, y: 0};
  cameraZoom = 1;
  
  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvasPan.nativeElement.getContext("2d")!;
    this.canvasPan.nativeElement.width = window.innerWidth;
    this.canvasPan.nativeElement.height = window.innerHeight;
    //this.cameraOffset =  { x: window.innerWidth/2, y: window.innerHeight/2 };
    this.cameraOffset =  { x: 0, y: 0 };
    this.previousCameraOffset =  { x: 0, y: 0 };


    this.canvasPan.nativeElement.addEventListener('mousedown', (e: MouseEvent) => this.onPonterDown(e));
    this.canvasPan.nativeElement.addEventListener('mouseup', (e: MouseEvent) => this.onPointerUp(e));
    this.canvasPan.nativeElement.addEventListener('mousemove', (e: MouseEvent) => this.onPointerMove(e));

    this.draw();
  }

  public draw() { 
    
    //this.ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
    //this.ctx.scale(this.cameraZoom, this.cameraZoom);
    //this.ctx.translate( -window.innerWidth / 2 + this.cameraOffset.x, -window.innerHeight / 2 + this.cameraOffset.y );
    this.previousCameraOffset.x = this.cameraOffset.x;
    this.previousCameraOffset.y = this.cameraOffset.y;
    this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y );    
    this.cameraOffset.x = 0;
    this.cameraOffset.y = 0;
    
    
    this.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    //parte che disegna    
    this.ctx.fillStyle = "#991111";
    this.ctx.fillRect(100, 100, 100, 100);
    
    //fine parte che disegna
    requestAnimationFrame(() => this.draw());    
  }

  onPonterDown(e: MouseEvent){
    this.isDragging = true;
    this.dragStart.x = getEventLocation(e).x - this.cameraOffset.x;
    this.dragStart.y = getEventLocation(e).y - this.cameraOffset.y;
    
    //this.dragStart.x = getEventLocation(e).x;
    //this.dragStart.y = getEventLocation(e).y;
    
    console.log('drag start: ', this.dragStart.x , this.dragStart.y);    
  }

  onPointerUp(e: MouseEvent){
    this.isDragging = false;
    console.log(this.isDragging);
    console.log('drag end: ', this.cameraOffset.x , this.cameraOffset.y);
  }

  onPointerMove(e: MouseEvent){
    if(this.isDragging){
      console.log('drag start: ', this.dragStart.x , this.dragStart.y);
      console.log('previous:', this.previousCameraOffset.x, this.previousCameraOffset.y);
      console.log('getEventLocation', e.clientX, e.clientY);
      this.cameraOffset.x = (getEventLocation(e).x - (this.dragStart.x + this.previousCameraOffset.x));
      this.cameraOffset.y = (getEventLocation(e).y - (this.dragStart.y + this.previousCameraOffset.y));
      console.log('current (result):',this.cameraOffset.x, this.cameraOffset.y);      
    }
  }
}

function getEventLocation(e: MouseEvent): any{
  if(e.clientX && e.clientY){
    return {x: e.clientX, y: e.clientY};      
  }
}

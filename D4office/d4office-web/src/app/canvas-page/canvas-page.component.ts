import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Seat } from '../seat';

@Component({
  selector: 'app-canvas-page',
  templateUrl: './canvas-page.component.html',
  styleUrls: ['./canvas-page.component.css']
})
export class CanvasPageComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>

  image = new Image();
  ctx: CanvasRenderingContext2D | null;
  private winH: number;
  private winW: number;
  seatListPosition: any[];
  seatList = new Array<Seat>();

  constructor() { }

  ngOnInit(): void {
    this.image.src = "../../assets/images/piantaMilano.svg";

    this.winH = 1000;
    this.winW = 2000;
    this.canvas.nativeElement.height = this.winH;
    this.canvas.nativeElement.width = this.winW;

    this.seatListPosition = [[4.57, 7.67,1],
    [6.12, 8.73,2],
    [4.57, 8.12,3],
    [12.34, 7.66,4],
    [4.57, 8.56,5],
    [5, 8.73,6],
    [5, 8.28,79],];

    this.ctx = this.canvas.nativeElement.getContext("2d");

    this.image.onload = () => {
      this.ctx?.drawImage(this.image, 0, 0, this.winW, this.winW * 0.5 );
    }

    this.seatListPosition.forEach(element => {
      let seat = new Seat( this.winW* element[0]/ 20, this.winW * element[1]/ 20,this.winW*.004,'#ff3908', element[2]);
      if(this.ctx){
        seat.draw(this.ctx);
        this.seatList.push(seat);
      }
    });

    


    window.addEventListener("resize", () => {
      //window.location.reload();
    })

    this.canvas.nativeElement.addEventListener('click', (event) => {
      const canvasRelavitveBound = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - canvasRelavitveBound.left;
      const y = event.clientY - canvasRelavitveBound.top;

      this.seatList.forEach(seat => {
        seat.click(x,y);
      });
    })
  }
}

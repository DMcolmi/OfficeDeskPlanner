import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasDesk } from '../canvasDesk';
import { DesksServiceService } from '../desks-service.service';

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
  deskListPosition: CanvasDesk[];
  deskList = new Array<CanvasDesk>();

  constructor(private desksService: DesksServiceService) { }

  ngOnInit(): void {



    this.image.src = "../../assets/images/piantaMilano.svg";

    this.winH = 1000;
    this.winW = 2000;
    this.canvas.nativeElement.height = this.winH;
    this.canvas.nativeElement.width = this.winW;
    
    this.ctx = this.canvas.nativeElement.getContext("2d");

    this.desksService.getDesksConf('MI').subscribe(
      desksConf => {
        this.deskListPosition = desksConf;
        console.log(this.deskListPosition);

        // this.deskListPosition = [
        //   new CanvasDesk(4.57, 7.67,0,'',1)
        // ]

        this.image.onload = () => {
          this.ctx?.drawImage(this.image, 0, 0, this.winW, this.winW * 0.5 );
        }
        
        this.deskListPosition.forEach(deskConf => {
          let desk = new CanvasDesk( this.winW* deskConf.xpos/ 20, this.winW * deskConf.ypos/ 20,this.winW*.004, deskConf.deskNo, deskConf.canBeReserved);
          if(this.ctx){
            desk.draw(this.ctx);
            this.deskList.push(desk);
          }
        });
      }
    );

    


    window.addEventListener("resize", () => {
      //window.location.reload();
    })

    this.canvas.nativeElement.addEventListener('click', (event) => {
      const canvasRelavitveBound = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - canvasRelavitveBound.left;
      const y = event.clientY - canvasRelavitveBound.top;

      this.deskList.forEach(seat => {
        seat.click(x,y);
      });
      this.ctx?.drawImage(this.image, 0, 0, this.winW, this.winW * 0.5 );
    })
  }
}

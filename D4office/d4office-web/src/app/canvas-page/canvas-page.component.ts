import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasDesk } from '../canvasDesk';
import { DesksServiceService } from '../desks-service.service';

@Component({
  selector: 'app-canvas-page',
  templateUrl: './canvas-page.component.html',
  styleUrls: ['./canvas-page.component.css']
})
export class CanvasPageComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>

  image = new Image();
  ctx: CanvasRenderingContext2D | null;
  private winH: number;
  private winW: number;
  private imgW: number;
  deskListPosition: CanvasDesk[];
  deskList = new Array<CanvasDesk>();
  modelDatePicker: any;
model: any;

  constructor(private desksService: DesksServiceService) { }

  ngOnInit(): void {

    this.image.src = "../../assets/images/piantaMilano.svg";
    this.imgW = 1200;
    this.winH = 500;
    this.winW = 1000;
    this.canvas.nativeElement.height = this.winH;
    this.canvas.nativeElement.width = this.winW;

    this.ctx = this.canvas.nativeElement.getContext("2d");
    if(this.ctx)
      this.ctx.globalAlpha = 0.7;

    this.desksService.getDesksConf('MI').subscribe({
      next: (desksConf) => {
        this.deskListPosition = desksConf;
        console.log(this.deskListPosition);
        this.deskListPosition.forEach(deskConf => {
          let desk = new CanvasDesk(this.imgW * deskConf.xpos / 20, this.imgW * deskConf.ypos / 20, this.imgW * .004, deskConf.deskNo, deskConf.canBeReserved);
          if (this.ctx) {
            desk.draw(this.ctx);
            this.deskList.push(desk);
          }
        });
      },
      error: (e) => console.log('error: ', e),
      complete: () => {
        console.log('finish');        
        this.ctx?.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);        
      }
    });

    window.addEventListener("resize", () => {
      //window.location.reload();
    })

    this.canvas.nativeElement.addEventListener('click', (event) => {
      this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      const canvasRelavitveBound = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - canvasRelavitveBound.left;
      const y = event.clientY - canvasRelavitveBound.top;

      this.deskList.forEach(seat => {
        seat.click(x, y);
      });
      this.ctx?.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);
    })
  }
}

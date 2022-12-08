import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MultipleDatesComponent } from 'ngx-multiple-dates';
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
  selectedDesk: CanvasDesk;

  constructor(private desksService: DesksServiceService) { }

  ngOnInit(): void {

    this.image.src = "../../assets/images/piantaMilano.svg"; 
    this.imgW = 2000;
    this.winH = 1000;
    var cardBound = this.canvasCard.nativeElement.getBoundingClientRect();    
    this.winW = (cardBound.right - cardBound.left) * .96;
    this.canvas.nativeElement.height = this.winH;
    this.canvas.nativeElement.width = this.winW;

    this.ctx = this.canvas.nativeElement!.getContext("2d")!;
    if(this.ctx)
      this.ctx.globalAlpha = 0.7;

    this.drawDeskConfiguration();

    window.addEventListener("resize", () => {
      window.location.reload();
    })


    this.canvas.nativeElement.addEventListener('click', (event) => {
      this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      const canvasRelavitveBound = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - canvasRelavitveBound.left;
      const y = event.clientY - canvasRelavitveBound.top;

      this.deskListRelativePosition.forEach(desk => {
        var isSelected : Boolean = desk.click(x, y);
        if(isSelected){
          this.selectedDesk = desk;
        }
      });
      this.ctx?.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);    
      console.log(this.selectedDesk);
        
    })

    
  }



  onSelectedDeskFromDropdown(){
      console.log(this.selectedDesk);   
      this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.deskListRelativePosition.forEach(desk => {
        desk.click(0, 0);
      });

      this.selectedDesk.click(this.selectedDesk.xpos, this.selectedDesk.ypos);
      this.ctx?.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);     
  }

  onDatePickerClick(){
    if(this.modelDatePicker.length > 0 )
      this.drawReservableDeskForSelectedDays();
    
    this.drawDeskConfiguration();
  }

  private drawReservableDeskForSelectedDays() {
    console.log(this.modelDatePicker);

    this.desksService.getReservableDeskForSelectedDays(this.modelDatePicker).subscribe({
      next: reservableDesks => {
        this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        reservableDesks.forEach(deskConf => {
          let desk = this.drawDesk(deskConf);
          if (deskConf.canBeReserved && !deskConf.isReserved)
            this.bookableDesks.push(desk);
        });

        this.ctx?.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);

      },
      error: (e) => console.log('error: ', e)
    });
  }

  private drawDeskConfiguration() {
    this.desksService.getDesksConf('MI').subscribe({
      next: (desksConf) => {

        this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        var deskListAbsolutePosition = desksConf;

        deskListAbsolutePosition.forEach(deskConf => {
          this.drawDesk(deskConf);
        });

        this.bookableDesks = new Array;
      },
      error: (e) => console.log('error: ', e),
      complete: () => {
        console.log('finish');
        this.ctx.drawImage(this.image, 0, 0, this.imgW, this.imgW * 0.5);
      }
    });
  }

  private drawDesk(deskConf: CanvasDesk) {
    let desk = new CanvasDesk(this.imgW * deskConf.xpos / 20, this.imgW * deskConf.ypos / 20, this.imgW * .004, deskConf.deskNo, deskConf.canBeReserved, deskConf.isReserved);
    desk.draw(this.ctx);
    this.deskListRelativePosition.push(desk);
    return desk;
  }
}


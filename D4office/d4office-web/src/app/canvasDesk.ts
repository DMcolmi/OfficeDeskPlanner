export class CanvasDesk {

    xpos: number;
    ypos: number;
    radius: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    deskNo: number;
	canBeReserved: boolean;
	availableForSelectedDays: boolean;

    constructor(xpos: number, ypos: number, radius: number, deskNo: number, canBeReserved: boolean){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = (canBeReserved ? '#08822f' : '#525252');
        this.deskNo = deskNo;
        this.canBeReserved = canBeReserved;
    }

    draw(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        ctx.beginPath();
        ctx.imageSmoothingEnabled= false;
        ctx.lineCap = 'round';
        ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, false);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = .5;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#000000';
       // ctx.fillText(this.seatNo.toString(), this.xPos - (this.radius/2), this.yPos - this.radius);

    }

    click(x: number, y: number){
        const distance: number = 
            Math.sqrt(
                Math.pow(x-this.xpos, 2) + 
                Math.pow(y-this.ypos, 2)
            )
        console.log(distance);
        if(distance<this.radius && this.canBeReserved){
            console.log('bingo');
            this.changeColor('#0873ff');

        } else {            
            this.changeColor((this.canBeReserved ? '#08822f' : '#525252'));
            this.draw(this.ctx);
        }            
    }

    changeColor(newColor: string){
        this.color = newColor;
        this.draw(this.ctx);
    }
}

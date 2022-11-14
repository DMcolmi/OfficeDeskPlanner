export class Seat {

    xPos: number;
    yPos: number;
    radius: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    seatNo: string;
	canBeReserved: boolean;
	isAvailableForSelectedDays: boolean;

    constructor(xPos: number, yPos: number, radius: number, color: string, seatNo: number){
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
        this.seatNo = seatNo.toString();
    }

    draw(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        ctx.beginPath();
        ctx.imageSmoothingEnabled= false;
        ctx.lineCap = 'round';
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI*2, false);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = .5;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#000000';
        ctx.fillText(this.seatNo, this.xPos - (this.radius/2), this.yPos - this.radius);

    }

    click(x: number, y: number){
        const distance: number = 
            Math.sqrt(
                Math.pow(x-this.xPos, 2) + 
                Math.pow(y-this.yPos, 2)
            )
        console.log(distance);
        if(distance<this.radius){
            console.log('bingo');
            this.changeColor('#0873ff');

        } else {            
            this.changeColor('#08ffb1');
            this.draw(this.ctx);
        }            
    }

    changeColor(newColor: string){
        this.color = newColor;
        this.draw(this.ctx);
    }

}

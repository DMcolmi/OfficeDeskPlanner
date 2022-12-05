export class CanvasDesk {

    xpos: number;
    ypos: number;
    radius: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    deskNo: number;
	canBeReserved: boolean;
	availableForSelectedDays: Boolean;

    constructor(xpos: number, ypos: number, radius: number, deskNo: number, canBeReserved: boolean, availableForSelectedDays: Boolean){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.deskNo = deskNo;
        this.canBeReserved = canBeReserved;
        this.availableForSelectedDays = availableForSelectedDays;
        this.color = this.getColor();
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

    click(x: number, y: number): Boolean {
        const distance: number = 
            Math.sqrt(
                Math.pow(x-this.xpos, 2) + 
                Math.pow(y-this.ypos, 2)
            )
        if(distance<this.radius && this.canBeReserved && this.availableForSelectedDays){
            console.log('bingo');
            this.changeColor('#0873ff');

        } else {                       
            this.changeColor(this.getColor());
            this.draw(this.ctx);
        }
        return distance<this.radius && this.canBeReserved && this.availableForSelectedDays;            
    }

    changeColor(newColor: string){
        this.color = newColor;
        this.draw(this.ctx);
    }

    getColor(): string{
        if(this.availableForSelectedDays != null){
            if(this.canBeReserved && this.availableForSelectedDays)    
            return '#70fa9c';
            if(this.canBeReserved && !this.availableForSelectedDays)    
            return '#7a5158';
        }
        if(this.canBeReserved){
            return '#d9dbd9'
        }
        return '#ffffff';
    }
}

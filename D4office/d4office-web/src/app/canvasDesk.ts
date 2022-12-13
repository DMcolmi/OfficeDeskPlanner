export class CanvasDesk {

    xpos: number;
    ypos: number;
    radius: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    deskNo: number;
	canBeReserved: boolean;
	isReserved: Boolean;
    officeId: String;

    constructor(xpos: number, ypos: number, radius: number, deskNo: number, canBeReserved: boolean, isReserved: Boolean, officeId: String){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.deskNo = deskNo;
        this.canBeReserved = canBeReserved;
        this.isReserved = isReserved;
        this.officeId = officeId;
        this.color = this.getColor();
    }

    draw(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        this.drawCircle(ctx, this.radius);
        this.drawText(ctx);
    }

    drawSelected(){
        this.changeColor('#29b0ff');
        this.drawCircle(this.ctx, this.radius*2);
        this.drawText(this.ctx);
    }

    private drawText(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#000000';
        ctx.font = `${this.radius}px sans-serif bold`;
        ctx.textAlign = 'center';
        ctx.fillText(this.deskNo.toString(), this.xpos, this.ypos + this.radius / 2);
    }

    private drawCircle(ctx: CanvasRenderingContext2D, radius: number) {
        ctx.beginPath();
        ctx.imageSmoothingEnabled = false;
        ctx.lineCap = 'round';
        ctx.arc(this.xpos, this.ypos, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = .5;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    click(x: number, y: number): Boolean {
        const distance: number = 
            Math.sqrt(
                Math.pow(x-this.xpos, 2) + 
                Math.pow(y-this.ypos, 2)
            )
        if(distance<this.radius && this.canBeReserved && (this.isReserved != null && !this.isReserved)){
            this.drawSelected();

        } else {                       
            this.changeColor(this.getColor());
            this.draw(this.ctx);
        }
        return distance<this.radius && this.canBeReserved && (this.isReserved != null && !this.isReserved);            
    }

    changeColor(newColor: string){
        this.color = newColor;
        this.draw(this.ctx);
    }

    getColor(): string{
        if(this.isReserved != null){
            if(this.canBeReserved && !this.isReserved)    
            return '#237d3b';
            if(this.canBeReserved && this.isReserved)    
            return '#ff5959';
        }
        if(this.canBeReserved){
            return '#ffffff'
        }
        return '#d9dbd9';
    }
}

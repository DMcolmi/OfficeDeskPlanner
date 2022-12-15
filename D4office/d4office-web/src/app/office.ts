export class Office {
    officeId: String = "";	
	officeDesc: String = "";	
	xDim: Number = 0;
	yDim: Number = 0;
	yOnXRatio: Number = 0;
	yLenght: Number = 2000;
	radiusScaleFactor: Number = 0;

    public getYLenght(): Number {
        return this.yLenght;
    }
}


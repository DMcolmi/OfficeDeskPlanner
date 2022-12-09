import { CanvasDesk } from "./canvasDesk";

export class Reservation {
    deskToBeReserved = new Array<CanvasDesk>();
    reservationDates = new Array<Date>();
    mailId: string;

    constructor(deskToBeReserved: Array<CanvasDesk>, reservationDates: Array<Date> , mailId: string ){
        this.deskToBeReserved=deskToBeReserved;
        this.reservationDates=reservationDates;
        this.mailId=mailId;
    }
    
}

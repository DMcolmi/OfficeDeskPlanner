import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanvasDesk } from './canvasDesk';
import { Reservation } from './reservation';


@Injectable({
  providedIn: 'root'
})
export class DesksServiceService {

  private baseUrl = 'http://localhost:8080/api/desks';
  private desksUrl = this.baseUrl;
  private getReservableDeskForDaysUrl =  this.baseUrl + '/getReservableDeskForDays';
  private bookDesksUrl =  this.baseUrl + '/book';

  constructor(
    private http: HttpClient
  ) { }

  getDesksConf(office: String): Observable<CanvasDesk[]>{
    return this.http.get<CanvasDesk[]>(`${this.desksUrl}/${office}`);
  }

  getReservableDeskForSelectedDays(modelDatePicker: Array<Date>): Observable<CanvasDesk[]>{
    return this.http.post<CanvasDesk[]>(`${this.getReservableDeskForDaysUrl}`,  modelDatePicker);
  }

  bookDesks(reservation: Reservation): Observable<unknown>{
    return this.http.post(`${this.bookDesksUrl}`, reservation);
  }
}

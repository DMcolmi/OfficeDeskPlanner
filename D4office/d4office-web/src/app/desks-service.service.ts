import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanvasDesk } from './canvasDesk';


@Injectable({
  providedIn: 'root'
})
export class DesksServiceService {

  private baseUrl = 'http://localhost:8080/api/desks';
  private desksUrl = this.baseUrl;
  private getReservableDeskForDaysUrl =  this.baseUrl + '/getReservableDeskForDays';

  constructor(
    private http: HttpClient
  ) { }

  getDesksConf(office: String): Observable<CanvasDesk[]>{
    return this.http.get<CanvasDesk[]>(`${this.desksUrl}/${office}`);
  }

  getReservableDeskForSelectedDays(modelDatePicker: Array<Date>): Observable<CanvasDesk[]>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(modelDatePicker);
    
    return this.http.post<CanvasDesk[]>(`${this.getReservableDeskForDaysUrl}`,  modelDatePicker);
  }

}

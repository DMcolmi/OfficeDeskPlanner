import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanvasDesk } from './canvasDesk';


@Injectable({
  providedIn: 'root'
})
export class DesksServiceService {

  private desksUrl = 'http://localhost:8080/api/desks';

  constructor(
    private http: HttpClient
  ) { }

  getDesksConf(office: String): Observable<CanvasDesk[]>{
    return this.http.get<CanvasDesk[]>(`${this.desksUrl}/${office}`);
  }

}

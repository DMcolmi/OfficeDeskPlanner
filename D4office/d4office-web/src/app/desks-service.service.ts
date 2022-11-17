import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desks } from './desks';

@Injectable({
  providedIn: 'root'
})
export class DesksServiceService {

  private desksUrl = 'http://localhost:8080/api/desks';

  constructor(
    private http: HttpClient
  ) { }

  getDesksConf(office: String): Observable<Desks[]>{
    return this.http.get<Desks[]>(`${this.desksUrl}/${office}`);
  }

}

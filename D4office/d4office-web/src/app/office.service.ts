import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from './office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  
  private baseUrl = 'http://localhost:8080/api/offices';
  private officesUrl = '/officesConf';

  constructor(private http: HttpClient) { }

  
  getOfficeById(officeId: String): Observable<Office>{
    return this.http.get<Office>(`${this.baseUrl}/${officeId}`);
  }

  getOffices(): Observable<Office[]>{
    return this.http.get<Office[]>(`${this.baseUrl}${this.officesUrl}`);
  }
}

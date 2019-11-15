import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  constructor(private http: HttpClient) { }

  public getAirports(): Observable<{}> {
    return this.http.get('assets/mock/airports.json');
  }
}

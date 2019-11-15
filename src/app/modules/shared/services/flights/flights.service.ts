import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  public getCityPairs(): Observable<{}> {
    return this.http.get('assets/mock/cityPairs-service.json');
  }
  public getFixedService(): Observable<{}> {
    return this.http.get('assets/mock/fixed-service.json');
  }
  public getFlexService(): Observable<{}> {
    return this.http.get('assets/mock/flexible-service.json');
  }
}

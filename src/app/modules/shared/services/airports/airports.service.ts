import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  constructor(private http: HttpClient) { }

  public getAirports(): Observable<{}> {
    return this.http.get('assets/mock/airports.json');
  }
  public getFilteredAirports(filterString: string): Observable<{}> {
    return this.http.get('assets/mock/airports.json').pipe(
      delay(500),
      map((airports: any) => {
        return airports.filter((airport: any) => {
          return airport.code.toLowerCase().indexOf(filterString.toLowerCase()) > -1 ||
            airport.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1 ||
            ((airport.country || {}).name || '').toLowerCase().indexOf(filterString.toLowerCase()) > -1;
        });
      })
    );
  }
}

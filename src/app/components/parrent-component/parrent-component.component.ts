import { Component, OnInit } from '@angular/core';
import { AirportsService } from 'src/app/modules/shared/services/airports/airports.service';
import { FlightsService } from 'src/app/modules/shared/services/flights/flights.service';
import {
  forkJoin,
  Observable,
  of,
  combineLatest,
  BehaviorSubject,
  Subject,
  from
} from 'rxjs';
import {
  switchMap,
  mergeMap,
  map,
  take,
  switchMapTo,
  switchAll,
  delay,
  mergeAll
} from 'rxjs/operators';

@Component({
  selector: 'app-parrent-component',
  templateUrl: './parrent-component.component.html',
  styleUrls: ['./parrent-component.component.scss']
})
export class ParrentComponentComponent implements OnInit {

  public subject$ = new Subject();

  public filter$ = new BehaviorSubject<string>('');

  public airportService$ = this.airportsService.getAirports();
  public airportsData;

  public cityPairs$ = this.flightService.getCityPairs();
  public fixed$ = this.flightService.getFixedService();
  public flex$ = this.flightService.getFlexService();

  constructor(private airportsService: AirportsService, private flightService: FlightsService) { }


  ngOnInit() {
    // this.airportService$.subscribe(data => {
    //   this.airportsData = data;
    // });
    this.forkJoinExample();
    this.switchAndMergeMapExampleMethod();
    this.combineLatestExampleMethod();

    // me.absenceSearchIndicator$.pipe(
    //   distinctUntilChanged(),

    //   debounceTime(600),
  }

  public forkJoinExample(): void {
    const forkJoin$ = forkJoin(this.cityPairs$, this.fixed$, this.flex$);

    forkJoin$.subscribe(forkJoinResults => {
      // console.log('forkJoinExample', forkJoinResults);
    });
  }

  public switchAndMergeMapExampleMethod(): void { // demonstrate mergeMap and switchMap
    this.filter$.pipe(
      mergeMap((filterString: string) => {
        return this.airportsService.getFilteredAirports(filterString);
      })
    ).subscribe(data => {
      console.log('MERGE/SWITCH MAP', data);
      this.airportsData = data;
    });
  }

  public combineLatestExampleMethod(): void {
    combineLatest(this.filter$, this.airportService$).pipe(
      map(([filterString, airports]: any) => {
        return airports.filter((airport: any) => {
          return airport.code.toLowerCase().indexOf(filterString.toLowerCase()) > -1 ||
            airport.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1 ||
            ((airport.country || {}).name || '').toLowerCase().indexOf(filterString.toLowerCase()) > -1;
        });
      }),
      take(5)
    ).subscribe(data => {
      // this.airportsData = data;
    });
  }

  // public switchMapExample(): void {
  //   this.airportService$.subscribe(data => console.log('airpotService', data));
  //   this.fixed$.subscribe(data => console.log('fixed', data));

  //   const switchMap$ = this.airportService$.pipe(
  //     switchMap(airportServiceResponse => {
  //       // airportServiceResponse
  //       return this.fixed$;
  //     })
  //   );

  //   switchMap$.subscribe(data => console.log('switch', data));
  // }

  // public exampleForMap(): void {
  //   const data$ = of([
  //     {
  //       brand: 'porsche',
  //       model: '911'
  //     },
  //     {
  //       brand: 'porsche',
  //       model: 'macan'
  //     },
  //     {
  //       brand: 'ferarri',
  //       model: '458'
  //     },
  //     {
  //       brand: 'lamborghini',
  //       model: 'urus'
  //     }
  //   ]);

  //   // get data as brand+model string. Result:
  //   // ["porsche 911", "porsche macan", "ferarri 458", "lamborghini urus"]
  //   data$
  //     .pipe(
  //       map(cars => cars.filter(car => car.brand === 'porsche'))
  //     ).subscribe(cars => console.log('fromMap', cars));
  // }

  // public exampleForMergeMap() {

  //   const getData = (param) => {
  //     return of(`retrieved new data with param ${param}`).pipe(
  //       delay(1000)
  //     );
  //   };

  //   // using a regular map
  //   from([1, 2, 3, 4]).pipe(
  //     map(param => getData(param))
  //   ).subscribe(val => console.log(val));

  //   from([1, 2, 3, 4]).subscribe(data => console.log('CREATED OBSERVABLE', data));

  //   // using map and mergeAll
  //   from([1, 2, 3, 4]).pipe(
  //     map(param => getData(param)),
  //     mergeAll()
  //   ).subscribe(val => console.log('using mergeAll', val));

  //   // using mergeMap
  //   from([1, 2, 3, 4]).pipe(
  //     switchMap(param => getData(param))
  //   ).subscribe(val => console.log('using mergeMap', val));
  // }

  // public exampleforSwtichMap() {

  //   const getData = (param) => {
  //     return of(`retrieved new data with param ${param}`).pipe(
  //       delay(1000)
  //     );
  //   };

  //   // using a regular map
  //   of(1, 2, 3, 4).pipe(
  //     map(param => getData(param))
  //   ).subscribe(val => val.subscribe(data => console.log('using regular map', data)));

  //   // using map and switchAll
  //   of(1, 2, 3, 4).pipe(
  //     map(param => getData(param)),
  //     switchAll()
  //   ).subscribe(val => console.log('using switch all', val));

  //   // using switchMap
  //   of(1, 2, 3, 4).pipe(
  //     switchMap(param => getData(param))
  //   ).subscribe(val => console.log('using swtich map', val));

  // }
}

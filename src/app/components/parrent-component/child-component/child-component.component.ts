import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {
  @Input() public airports;
  @Input() public filter$;
  public filter = new FormControl('');
  // public filter$: Observable<string>;

  constructor() { }

  ngOnInit() {
    this.filter.valueChanges.subscribe(filterString => {
      this.filter$.next(filterString);
    });
    // this.filter.valueChanges.subscribe(data => console.log(data));
    // this.filter$.subscribe(filterString => console.log(filterString));
    // console.log(this.airports);
  }

}

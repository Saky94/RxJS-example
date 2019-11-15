import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrentComponentComponent } from './parrent-component.component';

describe('ParrentComponentComponent', () => {
  let component: ParrentComponentComponent;
  let fixture: ComponentFixture<ParrentComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParrentComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParrentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

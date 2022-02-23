import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private locationDataSubject = new BehaviorSubject(null);
  locationData$ = this.locationDataSubject.asObservable();
  private showWidgetSubject = new BehaviorSubject({show: false});
  showWidget$ = this.showWidgetSubject.asObservable();

  constructor() {
  }

  setLocationData(data): void {
    this.locationDataSubject.next(data);
  }

  setShowWidget(data): void {
    this.showWidgetSubject.next(data);
  }
}

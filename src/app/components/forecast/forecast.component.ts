import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ApiService} from "../../_services/api.service";
import {DataService} from "../../_services/data.service";
import {Coord, showWidget} from "../../_models/current-weather";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  forecast
  currentLocation: Coord
  showWidget: showWidget

  constructor(private apiService: ApiService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.locationData$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        console.log(data)
        this.currentLocation = data
        if (this.showWidget.show){
          this.getForecastWeather(this.currentLocation)
        }
      }
    })
    this.dataService.showWidget$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data)
      if (data && data.show) {
        console.log(data)
        this.getForecastWeather(this.currentLocation)
      }
      this.showWidget = data
    })
  }

  getForecastWeather(location) {
    this.apiService.getForecast(location).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        console.log(data)
        this.forecast = data;

      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

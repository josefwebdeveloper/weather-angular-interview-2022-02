import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {share, Subject, Subscription, takeUntil, timer} from "rxjs";
import {User} from "../../_models/user";
import {map} from "rxjs/operators";
import {ApiService} from "../../_services/api.service";
import {CurrentWeather} from "../../_models/current-weather";
import {DataService} from "../../_services/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  time = new Date()
  user: User
  currentWeather: CurrentWeather
  options = {
    componentRestrictions: {
      country: ["AU"]
    }
  }

  constructor(private accountService: AccountService,
              private apiService: ApiService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.accountService.user.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      if (user) {
        this.user = user
        this.user.initials = (user?.firstName.charAt(0) + user?.lastName.charAt(0)).toUpperCase();

      }
    })
  }

  logout(): void {
    this.dataService.setShowWidget({show: false})
    this.accountService.logout()

  }

  showForecast(): void {
    if(!this.currentWeather) return
    console.log('show')
    this.dataService.setShowWidget({show: true})
  }

  getCurrentWeather(location): void {
    this.apiService.getCurrentWeather(location).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        console.log(data)
        this.currentWeather = data
        this.dataService.setLocationData(data.coord)
      }
    })
  }

  timeInit() {
    timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(time => {
        this.time = time;
      });
  }

  handleAddressChange(address: any) {
    if (address) {
      console.log(address)
      const location = {
        lat: address.geometry.location.lat(),
        lon: address.geometry.location.lng()
      }
      console.log(location)
      this.getCurrentWeather(location)
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

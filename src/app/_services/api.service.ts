import {Injectable} from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {CurrentWeather} from "../_models/current-weather";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getCurrentWeather(location): Observable<CurrentWeather>{
    return this.http.get<CurrentWeather>
    (`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${environment.weatherId}`)
      .pipe(catchError(err => {
        if (err.status === 404) {
          console.log(`Data not found`);
          return EMPTY
        }
      })
    )
  }
  getForecast(location): Observable<any>{
    return this.http.get<any>
    (`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=hourly,current,minutely,alerts&appid=${environment.weatherId}`)
      .pipe(catchError(err => {
          if (err.status === 404) {
            console.log(`Data not found`);
            return EMPTY
          }
        })
      )
  }

}

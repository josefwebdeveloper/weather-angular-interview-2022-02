import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../components/header/header.component";
import {ForecastComponent} from "../../components/forecast/forecast.component";
import {MainRoutingModule} from "./main-routing.module";
import {WelcomeComponent} from "../../components/welcome/welcome.component";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";



@NgModule({
  declarations: [
    HeaderComponent,
    ForecastComponent,
    WelcomeComponent,

  ],
  exports: [
    HeaderComponent,
    ForecastComponent,
    WelcomeComponent,
    GooglePlaceModule,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    GooglePlaceModule,

  ]
})
export class MainModule { }

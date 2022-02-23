import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {MainModule} from "../main/main.module";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MainModule,
    GooglePlaceModule,

  ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }

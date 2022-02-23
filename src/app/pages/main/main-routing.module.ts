import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from "./main.component";
import {ForecastComponent} from "../../components/forecast/forecast.component";
import {WelcomeComponent} from "../../components/welcome/welcome.component";
import {AuthGuard} from "../../_helpers/auth.guard";

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            { path: 'forecast', component: ForecastComponent, canActivate: [AuthGuard] },
            { path: 'welcome', component: WelcomeComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./_helpers/auth.guard";
import {MainComponent} from "./pages/main/main.component";
import {AccountModule} from "./pages/account/account.module";
import {MainModule} from "./pages/main/main.module";

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },

  // otherwise redirect to main
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

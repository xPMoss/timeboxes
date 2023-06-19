import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from "./pages/home/home.page";
import { SchedulePage } from "./pages/schedule/schedule.page";

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'schedule', component: SchedulePage },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

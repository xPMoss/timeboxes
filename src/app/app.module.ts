import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePage } from './pages/home/home.page';
import { SchedulePage } from './pages/schedule/schedule.page';


import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './components/table/table.component';

import { TimeService } from "./services/time.service";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FluidDirective } from './directives/fluid.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    //Pages
    HomePage,
    SchedulePage,
    //Components
    AppComponent,
    NavigationComponent,
    FooterComponent,
    TableComponent,
    //Directives
    FluidDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    FontAwesomeModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

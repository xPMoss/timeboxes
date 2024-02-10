import { Component, Input } from '@angular/core';
import { Time, WorkItem } from '../../models/day.model';

import { faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';

import { config } from "../../helpers/config";

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
 
})
export class TableComponent {

  time:Time = new Time();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  showDates:boolean = false;
  showWeekend:boolean = false;
  startDay:number = 0;
  endDay:number = 5;

  config = config;

  constructor(){
  
    this.time = new Time();
 
    /*
    import { ActivatedRoute } from '@angular/router';
    import { Location } from '@angular/common';

    import { HeroService } from '../hero.service';

    constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location
    ) {}
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.TimeService.getDay(id).subscribe(data => this.day = data);

    */

  }

  ngOnInit(){
    console.log("TableComponent.ngOnInit()")

    let showWeekend = localStorage.getItem("showWeekend")

    if (showWeekend == "true") {
      this.showWeekend = true;
      this.endDay = 7

      let object = document.getElementById("showWeekend") as HTMLInputElement;
      object.checked = true;

    }

    let showDates = localStorage.getItem("showDates")

    if (showDates == "true") {
      this.showDates = true;

      let object = document.getElementById("showDates") as HTMLInputElement;
      object.checked = true;

    }


  }


  toggleDates(){
    this.showDates = !this.showDates

    if (this.showDates) {
      localStorage.setItem("showDates", "true")
    }
    else{
      localStorage.setItem("showDates", "false")
    }
  }

  toggleWeekend(){
    this.showWeekend = !this.showWeekend

    if (this.showWeekend) {
      this.endDay = 7
      localStorage.setItem("showWeekend", "true")
    }
    else{
      this.endDay = 5
      localStorage.setItem("showWeekend", "false")
    }

  }

  msg(start:any){
   console.log(start)




  }



}

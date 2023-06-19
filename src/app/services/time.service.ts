import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Time } from "../models/day.model";


@Injectable({
  providedIn: 'root',
})
export class TimeService {

    time:Time = new Time();

    constructor() { 

    }

    getTime(): Observable<Time> {
        const time = of(this.time);
        return time;
    }
    

}
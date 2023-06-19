import { Helper } from "../helpers/helper";

class BaseObject{


    isExpanded:boolean = false;


    class!: string;

    toggleIsExpanded(){
        this.isExpanded = !this.isExpanded;

    }
}

export class Time extends BaseObject{

    years?:any;
    months?:any;
    weeks?:any;
    days?:any;

    currentWeek:Week = new Week();
    selectedWeek:Week = new Week();

    today:Day;
    selectedDay:Day;
    currentDay:Day;

    currentYear!:number;
    selectedYear!:number;

    constructor(){
        super()
        this.today = new Day( new Date(Date.now()) );
        this.selectedDay = new Day( new Date(Date.now()) );
        this.currentDay = new Day( new Date(Date.now()) );

        this.currentYear = this.currentDay.date.getFullYear();
        this.selectedYear = this.selectedDay.date.getFullYear();

        this.currentWeek = this.createWeek(this.today.date);
        this.selectedWeek = this.createWeek(this.today.date);            

    }

    calculate(){
        this.currentWeek.calculate();
        this.selectedWeek.calculate();

    }

    createYear(){

    }

    createMonth(){
        
    }

    createWeek(_date:Date){
        let week:Week = new Week();

        let start = 1 - _date.getDay();
        let end = 8 - _date.getDay();
    
        for (let i = start; i < end; i++) {
    
          let date = new Date(_date);
    
          date.setDate( date.getDate() + i )
    
          let object = new Day(date);

          week.days.push(object)
    
        }

        week.number = week.days[0].week;
        week.calculate();

        return week

    }

    nav(_dir:string, _amount:string){

        let number = 0;

        if(_amount == "day") {
            number = 1;
        }

        if(_amount == "week") {
            number = 7;
        }

        if(_amount == "year") {
            number = 365;
        }

        if (_dir == "+") {
          this.selectedDay.date.setDate( this.selectedDay.date.getDate() + number )
        }
        
        if(_dir == "-"){
            this.selectedDay.date.setDate( this.selectedDay.date.getDate() - number )
        }
    
        if(_dir == "today"){
            this.selectedDay.date = new Date( Date.now() );
          
        }

        this.selectedWeek = this.createWeek(this.selectedDay.date);
        this.selectedYear = this.selectedDay.date.getFullYear();
    }

}




export class Week extends BaseObject{

    info?:string;

    number?:number;
    yyww?:string;
    hhmm?:string;

    days:any[] = [];

    total:number = 0;


    constructor(){
        super()



    }

    calculate(){
        console.log("Week.calculate()")
        let total = 0;

        for (const day of this.days) {
          total += day.calculate();
    
        }

        this.total = total;

        if (isNaN(this.total)) {
            this.total = 0;
        }

        this.hhmm = Helper.hoursTohhmm(this.total);

        return this.total;
    
    }

}

export class Day extends BaseObject{
    info?:string;

    bkgColor:string = "";

    isToday:boolean = false;
    isWeekend:boolean = false;

    yyyymmdd?:string;
    yyyy_mm_dd?:string;
    hhmm?:string;
    week?:number;
    year?:number;

    date:Date = new Date();

    name?:string;

    start:number = 0;
    end:number = 0;
    total:number = 0;
    
    startTime:string = "";
    endTime:string = "";
    
    workItems:any[] = [];
    breaks:any[] = [];

    constructor(_date:Date){
        super()
        this.date = _date;

        this.year = _date.getFullYear();

        this.setDayName();
        this.setWeek();

        // Set yyyymmdd
        this.yyyymmdd = "";
        let date = "";
        let month = "";
        let year = _date.getFullYear().toString();

        if (_date.getDate() < 10) {
            date = "0";
        }
        date += _date.getDate().toString();

        if (_date.getMonth() < 9) {
            month = "0";

        }
        month += (_date.getMonth()+1).toString();

       this.yyyymmdd = year + month + date;

       this.yyyy_mm_dd =  year + "-" + month + "-" + date;

       //this.breaks.push( new Break() )

       // DEBUGG
       /*
       if (_date.getDay() == 0 || _date.getDay() == 6) {
        this.start = 0;
        this.end = 0;
        this.startTime = "00:00"
        this.endTime = "00:00"
        this.isWeekend = true;
        for (const b of this.breaks) {

            b.startTime = "00:00"
            b.endTime = "00:00"
            
        }

        for (const b of this.breaks) {
            b.start = 0;
            b.end = 0;
            
        }



       }
       */



    }


    setDayName(){
        switch (this.date.getDay()) {
            case 1:
                this.name = "Måndag"
                break;
            case 2:
                this.name = "Tisdag"
                break;
            case 3:
                this.name = "Onsdag"
                break;
            case 4:
                this.name = "Torsdag"
                break;
            case 5:
                this.name = "Fredag"
                break;
            case 6:
                this.name = "Lördag"
                break;
            case 0:
                this.name = "Söndag"
                break;
        
            default:
                break;
        }

    }


    calculate(){
      
        this.start = Helper.splitCommaTime(this.startTime);
        this.end = Helper.splitCommaTime(this.endTime);

        this.total = this.end - this.start;
    
        for (const w of this.workItems) {

            this.total = this.total + w.calculate();
            
        }

        for (const b of this.breaks) {

            this.total = this.total - b.calculate();
            
        }

       
        if (isNaN(this.total)) {
            this.total = 0;
        }

        this.hhmm = Helper.hoursTohhmm(this.total);


        return this.total;
    
    }


    setWeek() {
        let onejan:any = new Date(this.date.getFullYear(),0,1);
        let today:any = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate());

        let dayOfYear:number = ((today - onejan + 86400000)/86400000);

        if (this.date.getDay() == 0) {
            this.week = Math.ceil(dayOfYear/7 -1)
        }
        else{
            this.week = Math.ceil(dayOfYear/7)
        }
        
    };


}


export class WorkItem extends BaseObject{
    info?:string;
    type?:string = "";
    start:number = 12;
    end:number = 13;
    total:number = 0;

    startTime:string = "";
    endTime:string = "";
    hhmm?:string;

    constructor(){
        super()

    }

    calculate(){
      
        this.start = Helper.splitCommaTime(this.startTime);
        this.end = Helper.splitCommaTime(this.endTime);

        this.total = this.end - this.start;

        if (isNaN(this.total)) {
            this.total = 0;
        }

        this.hhmm = Helper.hoursTohhmm(this.total);

        return this.total;
    
    }




}

class Break extends BaseObject{

    info?:string;
    type?:string = "lunch";
    start:number = 0;
    end:number = 0;
    total:number = 0;

    startTime:string = "";
    endTime:string = "";
    hhmm?:string;

    constructor(){
        super()
    }

    calculate(){
      
        this.start = Helper.splitCommaTime(this.startTime);
        this.end = Helper.splitCommaTime(this.endTime);

        this.total = this.end - this.start;

        if (isNaN(this.total)) {
            this.total = 0;
        }

        this.hhmm = Helper.hoursTohhmm(this.total);

        return this.total;
    
    }

    
}


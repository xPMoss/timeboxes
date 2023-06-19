


export let Helper = {


        //45/60
        /*
        let decimalHours =  this.total;
        let n = new Date(0,0);
        n.setMinutes( + Math.round(decimalHours * 60) ); 

        let hours = n.getHours()
        let minutes = n.getMinutes()
        */



    hoursTohhmm : (_hours:number) => {
        let htm = _hours*60;
        let h = (htm - (htm % 60))/60;
        let m = htm % 60;

        h = Math.round(h);
        m = Math.round(m);

        return h + "h " + m + "m"
    },
    



    splitCommaTime : (time:string) => {
        let temp = time.split(":")

        let start = Number(temp[0]);
        let end = Number(temp[1])/60;

        return start + end;

    },
}
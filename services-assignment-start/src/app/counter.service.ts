import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService{

    ActiveToInactiveCounter = 0;
    InactiveToActiveCounter = 0;

    incrementActiveToInactive(){
        this.ActiveToInactiveCounter++;
        console.log(this.ActiveToInactiveCounter);
    }
    incrementInActiveToActive(){
        this.InactiveToActiveCounter++;
        console.log(this.InactiveToActiveCounter);
    }
}
import { Injectable } from "@angular/core";

@Injectable() //redudandant but recommanded by angular
export class LoggingService {
    logStatusChange(status:string){
        console.log('A server status changed, new status: ' + status);
    }
}

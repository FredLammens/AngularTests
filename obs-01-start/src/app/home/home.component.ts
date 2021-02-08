import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    /*
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    }) */
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(()  => {
        // next / error / complete
        observer.next(count); //next
        if(count == 2)
        observer.complete(); // complete
        if(count > 3)
        observer.error(new Error('count is greater then 3')); //error
        count++;
      },1000);
    });

    

    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => { return data > 0}) ,map((data:number) => {
      return 'Round: ' + (data + 1);
    })).subscribe((count) => {
      console.log(count);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!'); 
    });
  }
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}

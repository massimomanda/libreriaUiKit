import { Component, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testing';
  text!:string
  pippo: EventEmitter<any> = new EventEmitter();
  // pluto: Subject<any> = new Subject()
  // pippo = new Observable(subscriber => {
  //   subscriber.next(1);
  //   subscriber.next(2);
  //   subscriber.next(3);
  //   setTimeout(() => {
  //     subscriber.next(4);
  //     subscriber.complete();
  //   }, 1000);
  // });
  constructor(public toast:ToastService){}

  ngOnInit(){


    this.toast.setMessage('ciao')
    //this.pippo.emit('vafammocc')
    // this.pippo.subscribe({
    //   next(x) { console.log('got value ' + x); },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // });
    
  }

  metodo(){
    console.log('ciao')
  }
}

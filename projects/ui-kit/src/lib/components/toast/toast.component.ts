import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'lib-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input('icon') icon!: string;
  @Input('text') text: any;
  @Output('action') action  = new EventEmitter();


  //@Input("oggetto") oggetto:Subject<any> = new Subject()
  // @Output("oggetto") oggetto!: EventEmitter<any> 

  constructor() {
    
    // this.oggetto.subscribe({
    //   next(x) { console.log('got value ' + x); },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // });
    // this.oggetto.emit('strunz')
  }

  ngOnInit(): void {
    // this.oggetto.subscribe()
    // this.text = this.toast.messages
    
  }

  cta(event: any) {
    this.action.emit(event);
  }
}

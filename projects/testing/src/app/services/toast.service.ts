import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  newEvent: EventEmitter<any> = new EventEmitter();
  newPost: EventEmitter<any> = new EventEmitter();
  messages:any

  overlayVisible = false;
  isVisibleUndo: boolean = false; // per far visualizzare undo
  annulla: Subject<any> = new Subject();
  aModalIsOpen: boolean = false;

  constructor() {}

  setMessage(toastName: string) {
    this.messages = toastName
    this.newEvent.emit(this.messages)
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testing';
  text!: string
  pippo: EventEmitter<any> = new EventEmitter();
  formAutocomplete: FormGroup = {} as FormGroup;
  users: any = [];
  searchResult: any = [];
  messaggio!: string;
  selectedOption: number = 5;

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
  constructor(public toast: ToastService, private _fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formAutocomplete = this._fb.group({
      autocomplete: [''],

    });
    this.getAllUsers()
    this.toast.setMessage('ciao')
    //this.pippo.emit('vafammocc')
    // this.pippo.subscribe({
    //   next(x) { console.log('got value ' + x); },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // });
    this.formAutocomplete.valueChanges.subscribe((res: any) => {
      let risposta = res.autocomplete
      this.searchResult = this.users.filter((r: any) => r.toLowerCase().includes(risposta) && risposta !== '').slice(0, 5)


      if (this.formAutocomplete.value.autocomplete !== '' && this.searchResult.length === 0) {

        this.messaggio = 'Nessun risultato'

      }

    })
  }

  metodo() {
    console.log('ciao')
  }
  get contenutoBacheca() {
    return this.formAutocomplete?.get('autocomplete');
  }

  getInputValue() {
    // console.log(this.formAutocomplete.value.autocomplete)
  }

  getAllUsers() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any) => {
      let users = res;
      // console.log(users)
      users.forEach((user: any) => {
        // console.log(user.name)
        this.users.push(user.name)
      })
      console.log(this.users)
    })
  }
  onKeyDown(event: any) {
    switch (event.key) {
      case 'ArrowUp': {
        
        this.selectedOption = this.selectedOption > 0 ? this.selectedOption-1 : this.searchResult.length -1
        console.log(this.selectedOption)

        break;
      }
      case 'ArrowDown': {
        this.selectedOption++
        console.log(this.selectedOption)
   
        break;
      }
      default: break;
    }
  }

}

import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('input') input!: any;
  title = 'testing';
  text!: string;
  pippo: EventEmitter<any> = new EventEmitter();
  formAutocomplete: FormGroup = {} as FormGroup;
  users: any = [];
  searchResult: any = [];
  messaggio!: string;
  selectedOption: number = -1;
  currentSelection: any;
  searchSubscribe: any;
  selected = false;
  selectedText: string = '';

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
  constructor(
    public toast: ToastService,
    private _fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formAutocomplete = this._fb.group({
      autocomplete: [''],
    });
    this.getAllUsers();
    this.toast.setMessage('ciao');
    //this.pippo.emit('vafammocc')
    // this.pippo.subscribe({
    //   next(x) { console.log('got value ' + x); },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // });

    this.searchSubscription();
  }

  metodo() {
    console.log('ciao');
  }
  get contenutoBacheca() {
    return this.formAutocomplete?.get('autocomplete');
  }

  getInputValue() {
    // console.log(this.formAutocomplete.value.autocomplete)
  }

  getAllUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res: any) => {
        let users = res;
        // console.log(users)
        users.forEach((user: any) => {
          // console.log(user.name)
          this.users.push(user.name);
        });
        console.log(this.users);
      });
  }
  onKeyDown(event: any) {
    switch (event.key) {
      case 'ArrowUp': {
        this.selectedOption =
          this.selectedOption > 0
            ? this.selectedOption - 1
            : this.searchResult.length - 1;

        this.searchSubscribe.unsubscribe();

        this.currentSelection = this.searchResult[this.selectedOption];
        this.formAutocomplete.setValue({
          autocomplete: this.currentSelection,
        });

        setTimeout(() => {
          this.input.input.nativeElement.setSelectionRange(10000, 10000);
        }, 0);
        // console.log(this.input.input.nativeElement);

        this.searchSubscription();
        // this.selectedText = this.currentSelection;

        break;
      }
      case 'ArrowDown': {
        if (this.selectedOption < this.searchResult.length - 1) {
          this.selectedOption++;
          this.selectedText = this.currentSelection;
          this.currentSelection = this.searchResult[this.selectedOption];
          this.searchSubscribe.unsubscribe();

          this.formAutocomplete.setValue({
            autocomplete: this.currentSelection,
          });

          this.searchSubscription();
        } else {
          this.selectedOption = 0;
          this.currentSelection = this.searchResult[this.selectedOption];
          //   this.selectedText = this.currentSelection;
          this.searchSubscribe.unsubscribe();

          this.formAutocomplete.setValue({
            autocomplete: this.currentSelection,
          });

          this.searchSubscription();
        }

        break;
      }
      case 'Enter': {
        if (this.formAutocomplete.value.autocomplete !== '') {
          this.currentSelection = this.searchResult[this.selectedOption];
          this.formAutocomplete.setValue({
            autocomplete: this.currentSelection,
          });
          this.selected = true;
          this.selectedOption = -1;
          this.searchResult = [];
        }

        break;
      }
      default:
        break;
    }
  }
  onSelect(e: any) {
    this.currentSelection = e;
    //    console.log( this.currentSelection)
    this.searchSubscribe.unsubscribe();
    this.formAutocomplete.setValue({ autocomplete: this.currentSelection });
    this.selected = true;
    this.searchResult = [];

    this.searchSubscription();
  }

  searchSubscription() {
    this.searchSubscribe = this.formAutocomplete.valueChanges.subscribe(
      (res: any) => {
        this.selected = false;
        let risposta = res.autocomplete;
        this.currentSelection = '';
        this.searchResult = this.users
          .filter(
            (r: any) =>
              r.toLowerCase().startsWith(risposta.toLowerCase()) &&
              risposta !== ''
          )
          .slice(0, 5);

        if (
          this.formAutocomplete.value.autocomplete !== '' &&
          this.searchResult.length === 0
        ) {
          this.messaggio = 'Nessun risultato';
        } else {
          this.messaggio = '';
        }
      }
    );
  }

  clearInput() {
    this.formAutocomplete.setValue({ autocomplete: '' });
  }
}

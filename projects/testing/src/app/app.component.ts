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
import { SearchService } from './services/search/search.service';

import { ToastService } from './services/toast.service';
import { TokenService } from './services/token/token.service';
import { debounceTime } from 'rxjs/operators';

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
  risposta: string = '';
  token!: string;
  evidenziaRicerca = false;
  isSearching: boolean = false;

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
    private http: HttpClient,
    private tokenService: TokenService,
    private searchService: SearchService
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
      });
  }
  onKeyDown(event: any) {
    switch (event.key) {
      case 'ArrowUp': {
        if (this.searchResult.length > 0) {
          this.selectedOption =
            this.selectedOption > 0
              ? this.selectedOption - 1
              : this.searchResult.length - 1;

          this.searchSubscribe.unsubscribe();

          this.currentSelection = this.searchResult[this.selectedOption];
          this.formAutocomplete.setValue({
            autocomplete: this.risposta.concat(
              this.currentSelection.substr(this.risposta.length)
            ),
          });

          setTimeout(() => {
            this.input.input.nativeElement.setSelectionRange(10000, 10000);
          }, 0);
          // console.log(this.input.input.nativeElement);

          this.searchSubscription();
          // this.selectedText = this.currentSelection;
        }

        break;
      }
      case 'ArrowDown': {
        if (this.searchResult.length > 0) {
          if (this.selectedOption < this.searchResult.length - 1) {
            this.selectedOption++;
            //   this.selectedText = this.currentSelection;
            this.currentSelection = this.searchResult[this.selectedOption];
            this.searchSubscribe.unsubscribe();

            this.formAutocomplete.setValue({
              autocomplete: this.risposta.concat(
                this.currentSelection.substr(this.risposta.length)
              ),
            });

            this.searchSubscription();
          } else {
            this.selectedOption = 0;
            this.currentSelection = this.searchResult[this.selectedOption];
            //   this.selectedText = this.currentSelection;
            this.searchSubscribe.unsubscribe();

            this.formAutocomplete.setValue({
              autocomplete: this.risposta.concat(
                this.currentSelection.substr(this.risposta.length)
              ),
            });

            this.searchSubscription();
          }
        }

        break;
      }
      case 'Enter': {
        if (this.formAutocomplete.value.autocomplete !== '') {
          this.currentSelection = this.searchResult[this.selectedOption];

          if (this.currentSelection.startsWith(this.formAutocomplete.value)) {
          }
          this.formAutocomplete.setValue({
            autocomplete: this.risposta.concat(
              this.currentSelection.substr(this.risposta.length)
            ),
          });

          this.searchSubscribe.unsubscribe();
          this.selected = true;
          //   this.selectedOption = -1;
          this.searchResult = [];

          this.searchSubscription();
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

  //   searchSubscription() {
  //     this.searchSubscribe = this.formAutocomplete.valueChanges.subscribe(
  //       (res: any) => {
  //         this.risposta = res.autocomplete;
  //         this.currentSelection = '';
  //         this.searchResult = this.users
  //           .filter(
  //             (r: any) =>
  //               r.toLowerCase().startsWith(this.risposta.toLowerCase()) &&
  //               this.risposta !== ''
  //           )
  //           .slice(0, 5);

  //         this.selected = false;
  //         if (
  //           this.formAutocomplete.value.autocomplete !== '' &&
  //           this.searchResult.length === 0
  //         ) {
  //           this.messaggio = 'Nessun risultato';
  //         } else {
  //           this.messaggio = '';
  //         }
  //       }
  //     );
  //   }

  searchSubscription() {
    this.searchSubscribe = this.formAutocomplete.valueChanges
      .pipe(debounceTime(500))
      .subscribe((inputValue: any) => {
        this.isSearching = true;

        this.searchResult = [];
        this.risposta = inputValue.autocomplete;
        this.currentSelection = '';

        if (this.formAutocomplete.value.autocomplete !== ' ') {
          this.searchService.startSearch(this.risposta).subscribe(
            (res: any) => {
              console.log(res);
              res.albums.items.forEach((el: any) => {
                if (
                  el.name
                    .toLowerCase()
                    .startsWith(
                      this.formAutocomplete.value.autocomplete.toLowerCase()
                    )
                ) {
                  if (this.searchResult.length < 5) {
                    this.searchResult.push(el.name);
                    this.isSearching = false;
                  } 
                }
              });
            },
            (err) => {
              console.log(err);
              this.isSearching = false;
            }
          );
        } else {
          console.log('no');
        }

        this.selected = false;

        if (
          this.formAutocomplete.value.autocomplete !== '' &&
          !(this.searchResult.length === 0)
        ) {
          this.messaggio = 'Nessun risultato';
        } else {
          this.messaggio = '';
        }
      });
  }

  clearInput() {
    this.formAutocomplete.setValue({ autocomplete: '' });
  }

  onClick() {
    this.tokenService.getToken().subscribe(
      (token: any) => {
        this.token = token.access_token;
        localStorage.setItem('token', this.token);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

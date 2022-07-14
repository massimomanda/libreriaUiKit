import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, fromEvent, pluck, tap } from 'rxjs';

@Component({
  selector: 'lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.tabindex') tabindex = '0';
  @HostListener('focusout', ['$event.target']) onFocusout() {
    // console.log('s')
    this.risposta = '';
    this.isSearching = false;
    this.noResult = false;
    this.searchResult = [];
    if (this.input.nativeElement.value !== '') {

      this.showClear = true;
    }
  }

  @Input('textLabel') textLabel: string = '';
  @Input('placeholder') placeholder: string = '';
  @Input('backgroundInput') backgroundInput: string= '';
  @Input('isSearching') isSearching: boolean = false;
  @Input('noResult') noResult: boolean = false;
  @Output('valueInput') valueInput = new EventEmitter();
  @Input('height') height: string = '';
  @Input('for') for: string = '';
  @Input('name') name: string = '';
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @Input('type') type: string  = '';
  @ViewChild('input') input: ElementRef | any;
  @Output('blurForRer') blurForRed = new EventEmitter();
  @Input('value') value: string = '';
  @Input('autocomplete') autocomplete: string  = '';
  @Input('searchResult') searchResult: any[] = [];

  @Input('switchIcon') switchIcon: boolean = false;
  @Input('class') class: string  = '';

  @Output('clear') clear = new EventEmitter();
  @Output('onSelectedOption') onSelectedOption = new EventEmitter();
  @Output('onInput') onInput = new EventEmitter();
  @Input('debounceValue') debounceValue: number = 500;
  @Input('caratteriMinimiRicerca') caratteriMinimiRicerca: number = 0;

  inputValue: any = '';
  selectedOption: any = -1;
  currentSelection: any;
  risposta: string = '';
  selected: boolean = false;
  //   isSearching: boolean = false;
  messaggio: string = '';
  showClear: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // this.input.nativeElement.value = this.value ?? '';
    // this.noResult = false

    fromEvent(this.input?.nativeElement, 'input')
      .pipe(
        pluck('target', 'value'),
        tap((el) => {

          this.isSearching = true;
          this.showClear = false
          // this.noResult = false
        }),

        debounceTime(this.debounceValue)
      )
      .subscribe(
        (inputValue: any) => {
          //   this.searchResult = [];
          // this.noResult = false
          this.showClear = inputValue.length > 0;
          if (inputValue.length >= this.caratteriMinimiRicerca && inputValue.length !== 0) {

            if (inputValue.trim().length !== 0) {
              this.selected = false;
              this.risposta = inputValue;
              this.currentSelection = '';
              this.onInput.emit(inputValue.trim());
            }
          } else if (inputValue.length === 0) {
            this.searchResult = []
          }

          this.isSearching = false
          // this.searchService.startSearch(this.risposta).subscribe(
          //   (res: any) => {
          //     console.log(res);
          //     res.albums.items.forEach((el: any) => {
          //       if (
          //         el.name
          //           .toLowerCase()
          //           .startsWith(
          //             this.formAutocomplete.value.autocomplete.toLowerCase()
          //           )
          //       ) {
          //         if (this.searchResult.length < 5) {
          //           this.searchResult.push(el.name);
          //           this.isSearching = false;
          //         }
          //       }
          //     });
          //   },
          //   (err) => {
          //     console.log(err);
          //     this.isSearching = false;
          //   }
          // );


          //   if (inputValue !== '' && this.searchResult.length === 0) {
          //     this.messaggio = 'Nessun risultato';
          //   } else {
          //     this.messaggio = '';
          //   }
        },
        (err) => {
          this.isSearching = false;
        }

        //   if (
        //     this.formAutocomplete.value.autocomplete !== '' &&
        //     this.searchResult.length === 0
        //   ) {
        //     this.messaggio = 'Nessun risultato';
        //   } else {
        //     this.messaggio = '';
        //   }
        // });
      );
  }

  onClear() {
    // this.clear.emit(e);
    this.searchResult = [];
    this.input.nativeElement.value = '';
    this.risposta = '';
    this.showClear = false;
    this.isSearching = false;
    this.noResult = false;
  }

  onKeyDown(event: any) {
    switch (event.key) {
      case 'ArrowUp': {
        if (this.searchResult.length > 0) {
          this.selectedOption =
            this.selectedOption > 0
              ? this.selectedOption - 1
              : this.searchResult.length - 1;

          //   this.searchSubscribe.unsubscribe();

          this.currentSelection = this.searchResult[this.selectedOption];
          this.onSelectedOption.emit(this.currentSelection);

          //   this.formAutocomplete.setValue({
          (this.input.nativeElement.value = this.risposta.concat(
            this.currentSelection.substr(this.risposta.length)
          )),
            //   });

            setTimeout(() => {
              this.input.nativeElement.setSelectionRange(10000, 10000);
            }, 0);
          // console.log(this.input.input.nativeElement);

          //   this.searchSubscription();
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
            this.onSelectedOption.emit(this.currentSelection);
            // this.searchSubscribe.unsubscribe();

            // this.formAutocomplete.setValue({
            this.input.nativeElement.value = this.risposta.concat(
              this.currentSelection.substr(this.risposta.length)
            );
            // });

            // this.searchSubscription();
          } else {
            this.selectedOption = 0;
            this.currentSelection = this.searchResult[this.selectedOption];
            this.onSelectedOption.emit(this.currentSelection);

            this.input.nativeElement.value = this.risposta.concat(
              this.currentSelection.substr(this.risposta.length)
            );
            // this.currentSelection = this.searchResult[this.selectedOption];
            // this.onSelectedOption.emit(this.currentSelection);
            //   this.selectedText = this.currentSelection;
            // this.searchSubscribe.unsubscribe();

            // this.formAutocomplete.setValue({
            // });

            // this.searchSubscription();
          }
        }

        break;
      }
      case 'Enter': {
        // if (this.formAutocomplete.value.autocomplete !== '') {
          if(this.searchResult.length === 1){

            this.currentSelection = this.searchResult[0];
            this.onSelectedOption.emit(this.currentSelection);
          }else{
            this.currentSelection = this.searchResult[this.selectedOption];
            this.onSelectedOption.emit(this.currentSelection);
          }

        //   this.formAutocomplete.setValue({
        this.input.nativeElement.value = this.risposta.concat(
          this.currentSelection.substr(this.risposta.length)
        );
        this.selected = true;

        //   this.searchSubscribe.unsubscribe();
        this.selectedOption = -1;
        this.searchResult = [];
        //   this.searchSubscription();
        // }
        break;
      }
      default:
        break;
    }
  }

  onSelect(e: any) {
    this.currentSelection = e;
    this.input.nativeElement.value = this.currentSelection;
    this.selected = true;
    this.selectedOption = -1;
    this.searchResult = [];

    // this.searchSubscription();
  }

  //   onBlur(e:any){
  // console.log(e)
  //     this.searchResult = [];
  //     this.risposta = '';
  //     this.isSearching = false;
  //     this.noResult = false;
  //     if(this.input.nativeElement.value !== ''){

  //       this.showClear = true;
  //     }

  // }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
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
  @Input('textLabel') textLabel: string = '';
  @Input('placeholder') placeholder: string | undefined;
  @Input('backgroundInput') backgroundInput: string | undefined;
  //   @Input('showClear') showClear: boolean = false;
  @Input('isSearching') isSearching: boolean = false;
  @Output('valueInput') valueInput = new EventEmitter();
  @Input('height') height: string | undefined;
  @Input('for') for: string | undefined;
  @Input('name') name: string | undefined;
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @Input('type') type: string | undefined;
  @ViewChild('input') input: ElementRef | any;
  @Output('blurForRer') blurForRed = new EventEmitter();
  @Input('value') value: string | undefined;
  @Input('autocomplete') autocomplete: string | undefined;
  @Input('searchResult') searchResult: any[] = [];

  @Input('switchIcon') switchIcon: boolean = false;
  @Input('class') class!: string;

  @Output('clear') clear = new EventEmitter();
  @Output('onSelectedOption') onSelectedOption = new EventEmitter();
  @Output('onInput') onInput = new EventEmitter();

  inputValue: any = '';
  selectedOption: any = -1;
  currentSelection: any;
  risposta: string = '';
  selected: boolean = false;
  //   isSearching: boolean = false;
  messaggio: string = '';
  showClear: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.input.nativeElement.value = this.value ?? '';
    fromEvent(this.input?.nativeElement, 'input')
      .pipe(
        pluck('target', 'value'),
        tap((el) => {
          console.log(el);
          this.isSearching = true;
        }),

        debounceTime(500)
      )
      .subscribe(
        (inputValue: any) => {
          //   this.searchResult = [];
          this.isSearching = false;
          this.risposta = inputValue;
          this.currentSelection = '';
          this.showClear = inputValue.length > 0;
          this.onInput.emit(inputValue);

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
          this.selected = false;

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
        this.currentSelection = this.searchResult[this.selectedOption];
        this.onSelectedOption.emit(this.currentSelection);

        //   this.formAutocomplete.setValue({
        this.input.nativeElement.value = this.risposta.concat(
          this.currentSelection.substr(this.risposta.length)
        );

        //   this.searchSubscribe.unsubscribe();
        this.selected = true;
        //   this.selectedOption = -1;
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
    //    console.log( this.currentSelection)
    this.input.nativeElement.value = this.currentSelection;
    this.selected = true;
    this.searchResult = [];

    // this.searchSubscription();
  }
}

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

  @Input('height') height: string = '';
  @Input('for') for: string = '';
  @Input('name') name: string = '';
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @Input('type') type: string  = '';
  @ViewChild('input') input: ElementRef | any;

  @Input('value') value: string = '';

  @Input('searchResult') searchResult: any[] = [];


  @Input('class') class: string  = '';

  @Output('clear') clear = new EventEmitter();
  @Output('onSelectedOption') onSelectedOption = new EventEmitter();
  @Output('onInput') onInput = new EventEmitter();
  @Input('debounceValue') debounceValue: number = 500;
  @Input('minCharactersToStartSearch') minCharactersToStartSearch: number = 0;

  inputValue: any = '';
  selectedOption: any = -1;
  currentSelection: any;
  risposta: string = '';
  selected: boolean = false;
  messaggio: string = '';
  showClear: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    fromEvent(this.input?.nativeElement, 'input')
      .pipe(
        pluck('target', 'value'),
        tap((el) => {
          this.isSearching = true;
          this.showClear = false
        }),

        debounceTime(this.debounceValue)
      )
      .subscribe(
        (inputValue: any) => {

          this.showClear = inputValue.length > 0;
          if (inputValue.length >= this.minCharactersToStartSearch && inputValue.length !== 0) {

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
          
        },
        (err) => {
          this.isSearching = false;
        }

      );
  }

  onClear() {

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


          this.currentSelection = this.searchResult[this.selectedOption];
          this.onSelectedOption.emit(this.currentSelection);
          (this.input.nativeElement.value = this.risposta.concat(
            this.currentSelection.substr(this.risposta.length)
          )),


            setTimeout(() => {
              this.input.nativeElement.setSelectionRange(10000, 10000);
            }, 0);

        }

        break;
      }
      case 'ArrowDown': {
        if (this.searchResult.length > 0) {
          if (this.selectedOption < this.searchResult.length - 1) {
            this.selectedOption++;

            this.currentSelection = this.searchResult[this.selectedOption];
            this.onSelectedOption.emit(this.currentSelection);

            this.input.nativeElement.value = this.risposta.concat(
              this.currentSelection.substr(this.risposta.length)
            );

          } else {
            this.selectedOption = 0;
            this.currentSelection = this.searchResult[this.selectedOption];
            this.onSelectedOption.emit(this.currentSelection);

            this.input.nativeElement.value = this.risposta.concat(
              this.currentSelection.substr(this.risposta.length)
            );

          }
        }

        break;
      }
      case 'Enter': {

          if(this.searchResult.length === 1){

            this.currentSelection = this.searchResult[0];
            this.onSelectedOption.emit(this.currentSelection);
          }else{
            this.currentSelection = this.searchResult[this.selectedOption];
            this.onSelectedOption.emit(this.currentSelection);
          }


        this.input.nativeElement.value = this.risposta.concat(
          this.currentSelection.substr(this.risposta.length)
        );
        this.selected = true;

        this.selectedOption = -1;
        this.searchResult = [];

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

  
  }


}

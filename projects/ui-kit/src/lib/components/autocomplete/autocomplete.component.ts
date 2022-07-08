import { HttpClient } from '@angular/common/http';
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

@Component({
  selector: 'lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input('textLabel') textLabel: string | undefined;
  @Input('placeholder') placeholder: string | undefined;
  @Input('backgroundInput') backgroundInput: string | undefined;
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

  @Input('switchIcon') switchIcon: boolean = false;
  @Input('class') class!: string;

  inputValue: any = '';


  constructor() {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.value = this.value ?? '';
  }

  onShowPasswordClicked() {
    this.switchIcon = !this.switchIcon;
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  blurInput() {
    this.blurForRed.emit();
  }



  logInputValue() {
    console.log(this.inputValue)

  }

  
}

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit,AfterViewInit {

  @Input('textLabel') textLabel: string = "default textLabel";
  @Input('placeholder') placeholder: string = "default placeholder";
  @Input('backgroundInput') backgroundInput: string = 'coral' ;
  @Input('fontSize') fontSize: string = '25px' ;
  @Input('border') border: string = '5px solid blue;' ;
  @Output('valueInput') valueInput = new EventEmitter();
  @Input('for') for: string | undefined;
  @Input('name') name: string | undefined;
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @Input('type') type: string = "text";
  @ViewChild('input') input: ElementRef | any;
  @Output('blurForRer') blurForRed = new EventEmitter();
  @Input('value') value: string | undefined;
  @Input('autocomplete') autocomplete: string | undefined;


  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.input.nativeElement.value = this.value ?? '';
  }


  blurInput() {
    this.blurForRed.emit();
  }
}






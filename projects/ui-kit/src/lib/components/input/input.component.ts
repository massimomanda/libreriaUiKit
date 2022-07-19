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
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input('textLabel') textLabel: string = '';
  @Input('placeholder') placeholder: string = '';
  @Input('backgroundInput') backgroundInput: string = '';
  @Output('valueInput') valueInput = new EventEmitter();
  @Output('calendarClick') calendarClick = new EventEmitter();
  @Input('height') height: string = '';
  @Input('for') for: string = '';
  @Input('name') name: string = '';
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @Input('type') type: string = '';
  @ViewChild('input') input: ElementRef | any;
  @Output('blurForRer') blurForRed = new EventEmitter();
  @Input('value') value: string = '';
  @Input('autocomplete') autocomplete: string = '';
  @Input('togglePasswordVisibility') togglePasswordVisibility: boolean = false;
  @Input('switchIcon') switchIcon: boolean = false;
  @Input('class') class!: string;
  @Input('passwordIcon') passwordIcon!: string;
  @Input('toggleDatePicker') toggleDatePicker: boolean = false;

//   @Input('passwordIconHide') passwordIconHide!: string;


  constructor() {}

  ngOnInit(): void {}

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

  onClickCalendar(e: any) {
    this.calendarClick.emit(e)
  }

  blurInput() {
    this.blurForRed.emit();
  }
}

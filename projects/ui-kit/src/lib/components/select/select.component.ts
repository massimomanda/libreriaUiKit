import {
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

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @HostBinding('attr.tabindex') tabindex = '0';
  @HostListener('focusout', ['$event.target']) onFocusout() {
    this.selectWrapper.nativeElement.style.border = '1px solid #c6d1e4';
    this.isVisible = false;
  }

  @Input('label') label: string = '';
  @Input('for') for: string = '';
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;

  @Input('options') options: any = [];

  @ViewChild('selectWrapper') selectWrapper: ElementRef | any;

  @Output('selectedOption') selectedOption: EventEmitter<any> =
    new EventEmitter();

  isVisible: boolean = false;
  currentOption: string = '';
  keyboardOption: number = -1;

  constructor() {}

  ngOnInit(): void {}

  onSelect(index: any) {
    this.currentOption = this.options[index];
    this.isVisible = !this.isVisible;
    this.selectedOption.emit(this.currentOption);
    this.selectWrapper.nativeElement.style.border = '1px solid #c6d1e4';
  }

  optionsToggle() {
    this.isVisible = !this.isVisible;
    this.selectWrapper.nativeElement.style.border = '1px solid #97a4bb';
  }

  onKeydown(e: any) {
    switch (e.key) {
      case 'ArrowUp': {
        // this.keyboardOption--;
        this.keyboardOption =
          this.keyboardOption > 0
            ? this.keyboardOption - 1
            : this.options.length - 1;

        this.currentOption = this.options[this.keyboardOption];
        // console.log(this.keyboardOption);

        break;
      }
      case 'ArrowDown': {
        if (this.keyboardOption < this.options.length - 1) {
          this.keyboardOption++;
          this.currentOption = this.options[this.keyboardOption];
        } else {
          this.keyboardOption = 0;
          this.currentOption = this.options[this.keyboardOption];
        }
        break;
      }
      case 'Enter': {
        this.currentOption = this.options[this.keyboardOption];
        this.optionsToggle();
        this.selectedOption.emit(this.currentOption);
        
        break;
      }
      default:
        break;
    }
  }
}

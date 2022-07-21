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
interface Option{
  text: any,
  value: any
}

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.tabindex') tabindex = '0';
  flag!: boolean;
  @HostListener('focusout', ['$event.target']) onFocusout() {
    this.selectWrapper.nativeElement.style.border = '1px solid #c6d1e4';
    this.isVisible = false;
  }

  @Input('label') label: string = '';
  @Input('for') for: string = '';
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;

  @Input('optionSchema') optionSchema:Option = {text:'',value:''};
  @Input('options') options: any = [];

  @ViewChild('selectWrapper') selectWrapper: ElementRef | any;
  @ViewChild('optionsContainer') optionsContainer: ElementRef | any;


  @Output('selectedOption') selectedOption: EventEmitter<any> =
    new EventEmitter();

  isVisible: boolean = false;

  isUp: boolean = false;
  isDown: boolean = false;

  currentOption: string = '';
  keyboardOption: number = -1;
  top!: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // console.log(this.optionsContainer)
    // this.optionsContainer.nativeElement.classList.add('ciao')
    // if(this.optionsContainer.nativeElement.classList.contains('ciao') ) {
    //     this.optionsContainer.nativeElement.style.top = this.top;
    // }


    

  }

  onSelect(val:any) {
    this.currentOption = val[this.optionSchema.text];
    this.isVisible = !this.isVisible;
    this.selectedOption.emit(val);
    this.selectWrapper.nativeElement.style.border = '1px solid #c6d1e4';
  }

  optionsToggle(e?: any) {
    this.isVisible = !this.isVisible;
    // this.selectWrapper.nativeElement.style.border = '1px solid #97a4bb';

   
    let altezzaFinestra =
      this.options.length * e.target.getBoundingClientRect().height +
      e.target.getBoundingClientRect().height;
    if (
      altezzaFinestra + e.target.getBoundingClientRect().y >
      window.innerHeight
    ) {
      this.top =
        -1 * this.options.length * e.target.getBoundingClientRect().height;
      console.log(this.top);

      console.log('esci sopra');
      this.flag = false;

      
      // e.target.getBoundingClientRect()
    } else {
      this.top = e.target.getBoundingClientRect().height;
      console.log(this.top);
      console.log('esci sotto');
      this.flag = true;

      console.log(e.target.getBoundingClientRect().y);
    }
    // e.target.getBoundingClientRect() punto dove si trova la input
    // window.innerHeight(altezza pagina)
    // this.options.length*43(altezza option) + 43 (altezza input)
    
    // let options = document.getElementsByClassName('options-down-wrapper')
  
    // if(options && options[0]) {
    //     let opt: any = options[0]
    //     opt.style.top = this.top + 'px';
    // }
    
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
        this.isVisible = !this.isVisible;
        this.selectWrapper.nativeElement.style.border = '1px solid #97a4bb';
        this.selectedOption.emit(this.currentOption);

        break;
      }
      default:
        break;
    }
  }
}

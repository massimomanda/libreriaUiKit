import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input('textLabel') textLabel: string='';
  @Input('placeholder') placeholder: string | undefined;
  @Input('background') background: string | undefined;
  @Input('border') border: string | undefined;
  @Input('for') for: string | undefined;
  @Input('name') name: string | undefined;
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @Input('imgColor') imgColor: string = '';
  @Input('boxshadow') boxshadow:boolean = false;
  @Input('resize') resize: string = 'none';
  @Input('height') height: string = '100px';
  @Input('width') width: string = '100px';
  @Input('padding') padding: string | undefined;
  @Input('position') position: string | undefined;
  @Input('border-radius') borderRadius: string | undefined;
  @Input('outline') outline: string | undefined;
  @Input('overflow') overflow: string | undefined;
  
  

  constructor() { }

  ngOnInit(): void {
  }

}

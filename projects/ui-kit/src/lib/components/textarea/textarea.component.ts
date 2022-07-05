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

  constructor() { }

  ngOnInit(): void {
  }

}

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit,AfterViewInit{

  @Input('name') name: any;
  @Input('content') content!:string
  @Input('image') image!:string
  @Input('controlName') controlName: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = {} as FormGroup;
  @ViewChild('check ') check: ElementRef | any;

  

  on:boolean = false
  constructor() { }

  ngAfterViewInit(): void {
    // this.check.nativeElement.value
   
  }
  ngOnInit(): void {
    this.on = this.parentFormGroup.controls[this.controlName].value

    this.parentFormGroup.controls[this.controlName].valueChanges.subscribe(res => 
      this.on = res
      )

  }
  onClick(){
    this.check.nativeElement.click()
  }

}

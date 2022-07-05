import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit,AfterViewInit{

  @Input('name') name: string | undefined;
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
    
  }
  onClick(){
    this.on = !this.on;
    // this.check.nativeElement.click()
    this.check.nativeElement.click()
    // console.log(this.check.nativeElement.value)
  }
  clickTrigger(){
  }
}

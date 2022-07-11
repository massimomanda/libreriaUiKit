import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input('textButton') textButton:string | undefined;
  @Input('typeButton') typeButton:string | undefined;
  @Input('disabled') disabled:boolean | undefined;
  @Input('background') background:string | undefined;
  @Input('color') color:string | undefined;
  @Input('class') class!: string;
 
   constructor() { }
 


  ngOnInit(): void {
  }

}

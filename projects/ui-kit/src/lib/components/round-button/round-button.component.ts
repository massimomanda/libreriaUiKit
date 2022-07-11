import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.css']
})
export class RoundButtonComponent implements OnInit {
  @Input('image') image: string | undefined;
  @Input('text') text: string | undefined;
  @Input('border') border: string | undefined;
  @Input('background') background: string | undefined;
  @Input('height') height: string | undefined;
  @Input('width') width: string | undefined;

  

  constructor() { }

  ngOnInit(): void {
  }



}

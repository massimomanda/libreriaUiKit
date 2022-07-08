import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.css']
})
export class CloseButtonComponent implements OnInit {
  @Output('clear') clear = new EventEmitter();
 
  @Input('class') class!: string;



  constructor() { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    this.clear.emit(e)
  }
}


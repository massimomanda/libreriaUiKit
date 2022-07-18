import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs'

@Component({
  selector: 'lib-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  salutando: boolean = false;
  @Input('name') name!:string
  data: string = ''
  constructor() { }

  ngOnInit(): void {
    this.data = dayjs().format()
  }

  saluta() {
    this.salutando = true
    setTimeout(() => {
      this.salutando = false
    }, 3000);
  }

  

}

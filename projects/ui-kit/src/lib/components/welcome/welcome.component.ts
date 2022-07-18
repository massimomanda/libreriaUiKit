import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'lib-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  salutando: boolean = false;
  @Input('name') name!:string

  constructor() { }

  ngOnInit(): void {

  }

  saluta() {
    this.salutando = true
    setTimeout(() => {
      this.salutando = false
    }, 3000);
  }

  

}

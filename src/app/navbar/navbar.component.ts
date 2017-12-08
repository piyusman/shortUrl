import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'navbar-tools',
  moduleId: module.id,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
   title = 'Leantaas Tools Management';
  constructor() {
}


  ngOnInit() {

  }
}

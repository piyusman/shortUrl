import { Component, OnInit } from '@angular/core';
import { User } from '../model/index';
import { Item } from '../model/item';
import { HomeService } from '../home/home.service';
import {NgZone} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  item: Item;
  items: Item[] = [];
  users: User[] = [];
  count:number;
  userData: string;
  constructor(private homeService : HomeService,private zone:NgZone,private router : Router) {
    this.currentUser = new User();
    this.item = new Item();
    this.items = new Array<Item>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.ngOnInit();
  }


  ngOnInit() {
    this.item.url="";
    this.item.shortName="";
    this.zone.run(() => this.currentUser = JSON.parse(localStorage.getItem('currentUser')));
    this.zone.run(() => this.getUserEndpoints());
  }

  private getUserEndpoints() {
    var email = this.currentUser.emailId;
    var name   = email.substring(0, email.lastIndexOf("@"));
    this.homeService.getUserEndpoints(name).subscribe(
      data => {
      this.userData = JSON.stringify(data);
      this.format();
      }
    );

}
format(){
  let jsonData = JSON.parse(this.userData);
  this.items = jsonData.Items;
  this.count = jsonData.Count;

}

save(){
  var email = this.currentUser.emailId;
  var name   = email.substring(0, email.lastIndexOf("@"));
  this.homeService.saveNewUrl(this.item.url,this.item.shortName,name).subscribe(
    data => {
      this.getUserEndpoints();
      this.ngOnInit();
    },
    error => console.log(error)
  );

}

logout() {
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
}

edit(){
console.log("edit");
}
delete(){
console.log("delete");
}
}

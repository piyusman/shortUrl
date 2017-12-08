import { Component, OnInit } from '@angular/core';
import {ElementRef, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../login/loginService';
import { User } from '../model/index';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  currentUser:User;
  private clientId:string = '226688686079-b8075rnlngdhstl3160qjdvhukfkao92.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;

  public googleInit() {
    console.log("I am here");
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      console.log(that.element.nativeElement.firstChild);
      that.attachSignin(that.element.nativeElement.firstChild);

    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        localStorage.removeItem('currentUser');
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        that.currentUser.emailId = profile.getEmail();
        that.currentUser.name = profile.getName();
        that.currentUser.id= profile.getId();
        localStorage.setItem('currentUser',JSON.stringify(that.currentUser));
        that.router.navigate(['/home']);
       /* that.loginService.login(that.currentUser.emailId).subscribe(
          data => {
            localStorage.setItem('currentUser',JSON.stringify(that.currentUser));
            that.router.navigate(['/home']);
          },
          error => {
          });
          */
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef, private router: Router) {
    console.log('ElementRef: ', this.element);
    this.currentUser = new User();
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}

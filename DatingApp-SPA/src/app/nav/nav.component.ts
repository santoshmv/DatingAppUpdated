import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
//  compqty: any;

  constructor(public authService: AuthService, private alertyfy: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertyfy.success('logged in successfully.');
    }, error => {
      this.alertyfy.error(error);
    }, () => {
       this.router.navigate(['/members']);
    });
  }

  // loggedIn() {
  //   const token = localStorage.getItem('token');
  //   return !!token;
  // }
  // above is previous implementation

  loggedIn() {
    // console.log(this.model);
    // this.model.pqty = + this.model.pqty;
        return this.authService.loggedIn();
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertyfy.message('Logged out');
    this.router.navigate(['/home']);
  }
}

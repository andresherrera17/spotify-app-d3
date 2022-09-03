import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  constructor(
    private _serviceAuth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this._serviceAuth.login().then(() => {
      this.router.navigate(['home']);
    })
  }
}

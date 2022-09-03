import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../models/login-view-model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginViewodel:LoginViewModel = new LoginViewModel();
  loginError:string = "";
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  
  onLoginClick(event:any){
    this.loginService.Login(this.loginViewodel).subscribe(
      (Response)=>{
        this.router.navigateByUrl("dashboard")
      },
      (error)=>{
        console.log(error);
        this.loginError = "Invalid UserName or Password";
      }
    )
  }

}

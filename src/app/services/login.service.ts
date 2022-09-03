import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginViewModel } from '../models/login-view-model';
import { SignUpViewModel } from '../models/sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName:string="";
  private http!: HttpClient;
  constructor(private httpBackend: HttpBackend, private router:Router,private jwtHelperService:JwtHelperService) { }

  public Login(loginViewModel : LoginViewModel):Observable<any>{
    this.http = new HttpClient(this.httpBackend);
    return this.http.post<any>("http://localhost:8081/api/auth/signin",loginViewModel, {responseType:"json"})
    .pipe(map(user =>{
      if(user){
        localStorage.setItem("role",user.roles[0]);
        localStorage.setItem("token",user.accessToken);
        this.currentUserName = user.username;
      }
      return user;
    }))
  }

  public registre(signUpViewModel: SignUpViewModel): Observable<any>{
    console.log(signUpViewModel);
    this.http = new HttpClient(this.httpBackend);
    return this.http.post<any>("http://localhost:8081/api/auth/signup",signUpViewModel, {responseType:"json"})
  }

  public logout(){
    this.currentUserName = "";
    localStorage.removeItem("token");
    this.router.navigateByUrl('login');
  }

  public isAuthenticated():boolean{
    var token = localStorage.getItem("currentUser") ? localStorage.getItem("currentUser") : null;
    if(this.jwtHelperService.isTokenExpired()){
      return false; //token is not valid
    }else{
      return true; // token is valid
    }
  }
}

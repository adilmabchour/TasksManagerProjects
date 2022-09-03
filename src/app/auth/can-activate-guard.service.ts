import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService:LoginService,private router:Router,public jwtHelperService:JwtHelperService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{

    if(localStorage.getItem("token") != "" && localStorage.getItem("role") == route.data["expect"]){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
  }
}

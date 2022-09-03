import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = null;
    if(localStorage.getItem("token") != ""){
      token = localStorage.getItem("token");
    }
    req = req.clone({
      setHeaders:{
        Authorization:"Bearer " + token
      }
    });

    return next.handle(req);
  }
}

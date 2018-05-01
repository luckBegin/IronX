import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse ,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(
    private router : Router ,
  ){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let obj = this.ls.get("token") ;
    // const headers = new HttpHeaders({
    //   'sso_token': obj['token'],
    //   "sso_loginname" : obj['loginName'] ,
    //   'sso_busId' : obj['commercialId']+"",
    //   'sso_stuffId' : obj['id']+""
    // });
    req = req.clone({
        withCredentials: true
    });
    return next.handle(req)
      .do( event => {
        return event ;
      }, err => {
        let code = err['status'] ;
        if(code == 404){
          // this.router.navigate(['/login']) ;
        }
      })
  };
};
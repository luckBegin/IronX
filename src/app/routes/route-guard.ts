import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { SessionStorageService } from '../service/storage/session_storage';

@Injectable()
export class RouteguardService implements CanActivate{

  constructor(
    private router: Router ,
    private sgo : SessionStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  	let userInfo = this.sgo.get("loginInfo") ;

  	if(userInfo){
  		return true ;
  	}else{
  		this.router.navigate(['/login'])
	  	return false ;
  	}
  };
}
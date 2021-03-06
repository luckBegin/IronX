import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class MenuRemoteServce{
	constructor(
		private http : HttpClient
	){};

	getAllMenu( ){
		let url = GLOBAL.API.menu.getAllMenu ;
		return this.http.get(url) ;
    };
    
    getRoleMenu( id : string | number){
        let url = GLOBAL.API.menu.roleMenu + "?roleIds=" + id ;
        return this.http.get(url) ;
	};
	
	getButton( menuId : number | string){
		let url = GLOBAL.API.menu.getButtonList + menuId ;
		return this.http.get(url) ;
	}

	getSelfMenu(){
		let url = GLOBAL.API.menu.slefMenu ;
		return this.http.get(url) ;
	}
};

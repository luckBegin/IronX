import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery'
@Injectable()
export class WorkbenchAll{
	constructor(
		private http : HttpClient
	){};

	getOrderList(obj : object , state : number ){
		let url = GLOBAL.API.workbench.orderList + state;

		let param = ObjToQuery(obj) ;
		return this.http.get(url , {
			params : param
		}) ;
	};

	getOrderType(){
		let url = GLOBAL.API.workbench.orderType ;
		return this.http.get(url) ;
	};

	gettUserManage(){
		let url = GLOBAL.API.workbench.userManager ;
		return this.http.get(url) ;
	}
};
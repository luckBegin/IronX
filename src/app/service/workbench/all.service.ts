import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders} from '@angular/common/http' ;
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
	};

	getOrderStatus(){
		let url =GLOBAL.API.workbench.orderStatus ;
		return this.http.get(url) ;
	};

	pass(id : string , obj : object ){
		let url = GLOBAL.API.workbench.pass +id; 

		let header = new HttpHeaders()
			.set("Content-type" , "application/json");

		return this.http.put(url ,obj , {
			headers :header
		})
	};

	refuse(obj : object ){
		let url = GLOBAL.API.workbench.refuse;

		let header = new HttpHeaders()
			.set("Content-type" , "application/json");

		return this.http.put(url ,obj , {
			headers :header
		})
	};

	cancel( id : number | string ){
		let url = GLOBAL.API.workbench.cancel + id ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.put(url , {
			headers : header
		});
	};

	getOderInfo(id : string | number){
		let url = GLOBAL.API.workbench.orderInfo + id ;

		return this.http.get(url) ;
	};

	postClientInfo(obj  : object){
		let url = GLOBAL.API.workbench.postClient;

		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
	};

	submitInto(obj : object){
		let url = GLOBAL.API.workbench.into;

		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
	};

	getDealUser(){
		let url = GLOBAL.API.workbench.dealUserList ;
		return this.http.get(url )
	}
};
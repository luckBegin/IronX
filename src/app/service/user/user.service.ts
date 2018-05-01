import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders} from '@angular/common/http' ;
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class Userservice{
	constructor(
		private http : HttpClient 
	){};

	getList(){
		let url = GLOBAL.API.workbench.userManager ;

		return this.http.get(url) ;
	};

	getDealUserlist(){
		let url = GLOBAL.API.workbench.dealUserList;

		return this.http.get(url) ;
	};

	getUserList( para : object ){
		let url = GLOBAL.API.usr.getUsrList ;
		let params = ObjToQuery(para) ;
		return this.http.get(url , {
			params : params
		});
	};
	getLoginUser(){
		let url = GLOBAL.API.usr.getLoginUser ;
		return this.http.get(url);
	};

	changePass(id : number , newPass : string){
		let url = GLOBAL.API.usr.changePass + id +"?newPassword="+newPass ;

		let header = new HttpHeaders()
			.set("Content-type" , "application/json");

		return this.http.put(url , {} ,{
			headers : header
		})
	};

	getStuff(obj){
		let url = GLOBAL.API.usr.stuffList ;
		let params = ObjToQuery(obj) ;
		return this.http.get(url, {
			params : params
		});
	};

	getRoleList(){
		let url = GLOBAL.API.role.getRoleList;
		return this.http.get(url) ;
	};
	addStuff(obj : object){
		let url = GLOBAL.API.usr.addStuff ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json");

		return this.http.post(url , obj ,{
			headers : header
		});
	}

	freeze(id : number ){
		let url = GLOBAL.API.usr.freeze + id ;
		return this.http.put(url , {})
	}
	unFreeze(id : number ){
		let url = GLOBAL.API.usr.unFreeze + id ;
		return this.http.put(url , {})
	};

	getAllDue(){
		let url = GLOBAL.API.usr.getAllDue;
		return this.http.get(url) ;
	};

	delRole(id : string | number){
		let url = GLOBAL.API.role.delRole + id ;

		return this.http.delete(url) ;
	};

	editRole(obj : object){
		let url = GLOBAL.API.role.editRole ;

		let header = new HttpHeaders()
		.set("Content-type" , "application/json");

		return this.http.put(url ,obj , {
			headers : header
		});
	}
};
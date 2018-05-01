import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class ToolService{
	constructor(
		private http : HttpClient
	){};

	getCalc(object : object){
		let url = GLOBAL.API.tool.clac ;
		let para = ObjToQuery(object) ;
		return this.http.get(url , {
			params : para
		})
	}

	getSideList(){
		let url = GLOBAL.API.tool.siteList ;
		return this.http.get(url) ;
	}
	delSite( id :number | string){
		let url = GLOBAL.API.tool.delSite + id ;
		return this.http.delete(url) ;
	}
	createSite(object : object){
		let url = GLOBAL.API.tool.createSite ;

		let header = new HttpHeaders()
		.set("Content-type" , "application/json") ;


		return this.http.post(url , object , {
			headers : header
		})
	}
	editSite(object : object){
		let url = GLOBAL.API.tool.createSite ;

		let header = new HttpHeaders()
		.set("Content-type" , "application/json") ;


		return this.http.put(url , object , {
			headers : header
		})
	}

};

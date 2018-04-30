import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class ProductService{
	constructor(
		private http : HttpClient
	){};

	getList(obj : object = {} ){
		let url = GLOBAL.API.product.productList ;

		let param = ObjToQuery(obj) ;
		return this.http.get(url , {
			params : param
		}) ;
	};

	createPro(obj : object ) {
		let url = GLOBAL.API.product.create ;
		let headers = new HttpHeaders()
			.set("content-type" , "application/json");
		return this.http.post(url , obj ,{
			headers : headers
		})
	};

	deletePro( id : number){
		let url = GLOBAL.API.product.delete  + id ;
		return this.http.delete(url)
	};

	editPro(obj){
				let url = GLOBAL.API.product.edit ;
		// let headers = new HttpHeaders()
		// 	.set("content-type" , "application/json");
		return this.http.put(url , obj )
	}
};
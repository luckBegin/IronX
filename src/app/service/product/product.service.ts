import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class ProductService{
	constructor(
		private http : HttpClient
	){};

	getList(obj : object ){
		let url = GLOBAL.API.product.productList ;

		let param = ObjToQuery(obj) ;
		return this.http.get(url , {
			params : param
		}) ;
	};
};
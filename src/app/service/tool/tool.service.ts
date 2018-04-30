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
};

import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';
import { ObjToQuery } from '../ObjToQuery' ;

@Injectable()
export class FinancialService{
	constructor(
		private http : HttpClient
	){};

	getRecheckList(obj : object){
		let url = GLOBAL.API.financial.getRecheck ;
		let para = ObjToQuery(obj) ;
		return this.http.get(url , {
			params : para
		})
	};

	verify(id : number , data : Date){
		let url = GLOBAL.API.financial.verify + id ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json")
		return this.http.patch(url , {
			realRepaymentDate : data
		})
	};

	getLoanList(obj : object){
		let url = GLOBAL.API.financial.loanList ;
		let para = ObjToQuery(obj) ;
		return this.http.get(url , {
			params : para
		});
	};
};
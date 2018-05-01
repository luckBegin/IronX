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

	verify(obj : object){
		let url = GLOBAL.API.financial.verify + obj['id'] + "?realRepaymentDate=" + obj['realRepaymentDate']
		return this.http.patch(url , {});
	};

	getLoanList(obj : object){
		let url = GLOBAL.API.financial.loanList ;
		let para = ObjToQuery(obj) ;
		return this.http.get(url , {
			params : para
		});
	};
};
import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery';
import { ObjToQueryString } from '../ObjToQueryString' ;
import { FileDetector } from 'selenium-webdriver/remote';
@Injectable()
export class AfterLoanService{
	constructor(
		private http : HttpClient
	){};

	getList(obj : object){
        let url = GLOBAL.API.afterLoan.getList;
        let para = ObjToQuery(obj) ;
		return this.http.get(url , {
            params : para
        });
	};

	deleteOrder(id : number ){
		let url = GLOBAL.API.afterLoan.deleteOrder + id ;
		return this.http.delete(url)
	};

	uploadExcel(fileData : File){
		let fileForm = new FormData() ;
		fileForm.append("file" , fileData) ;
		let url = GLOBAL.API.afterLoan.uploadExcel ;
		return this.http.post(url , fileForm)
	};

	exportExcel(obj : object) : string{
		let url = GLOBAL.API.afterLoan.exportExcel +"?" ;
			url += ObjToQueryString(obj) ;
		return url ;
	};

	addRecord(obj){
		let url = GLOBAL.API.afterLoan.addRecord ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url , obj , {
			headers : header
		})
	}

	getCollect(obj : object){
        let url = GLOBAL.API.afterLoan.getCollect;
        let para = ObjToQuery(obj) ;
		return this.http.get(url , {
            params : para
        });
	};

	getCollectExcel(obj : object) : string{
		let url = GLOBAL.API.afterLoan.exportCollect +"?" ;
			url += ObjToQueryString(obj) ;
		return url ;
	};

	sued(id){
		let url = GLOBAL.API.afterLoan.sued  + id ;
		return this.http.patch(url , {}) ;
	}

	getSue(obj : object){
        let url = GLOBAL.API.afterLoan.getCollect;
        let para = ObjToQuery(obj) ;
		return this.http.get(url , {
            params : para
        });
	};
	sueExcel(obj : object) : string{
		let url = GLOBAL.API.afterLoan.sueExcel +"?" ;
			url += ObjToQueryString(obj) ;
		return url ;
	}

	makeSue(id , state){
		let url =  GLOBAL.API.afterLoan.makeSue + id + "?stateCode=" + state ;
		return this.http.patch(url , {}) ;
	}

	sueList(obj : object){
        let url = GLOBAL.API.afterLoan.sueList;
        let para = ObjToQuery(obj) ;
		return this.http.get(url , {
            params : para
        });
	};
};
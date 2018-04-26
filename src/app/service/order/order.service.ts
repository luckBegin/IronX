import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class OrderSevice{
	constructor(
		private http : HttpClient
	){};

	getImg( id : number ){
		let url = GLOBAL.API.order.getImg + id ;

		// let param = ObjToQuery(obj) ;
		return this.http.get(url) ;
	};
	getDealRecord(id : number | string){
		let url = GLOBAL.API.order.dealRecord + id ;
		return this.http.get(url) ;
	} ;

	getTelRecord(orderId : number | string ) {
		let url = GLOBAL.API.order.telRecord + orderId
		return this.http.get(url) ;
	};

	postTelRecord(obj : object ){
		let url = GLOBAL.API.order.addTelRecord ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;
		return this.http.post(url , obj , {
			headers :header
		});
	};

	editTelRecord(obj : object ){
		let url = GLOBAL.API.order.addTelRecord ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;
		return this.http.put(url , obj , {
			headers :header
		});
	};

	saveRepost( obj : object ){
		let url = GLOBAL.API.order.saveReport ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
	};

	saveTelCheck( obj : object ){
		let url = GLOBAL.API.order.telCheckRecord ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
	};

	saveFirstCheck( obj : object ){
		let url = GLOBAL.API.order.saveFirstCheck ;
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
	};

	getFirstCheckResult(orderId : number | string){
		let url = GLOBAL.API.order.getFirestCheclRst + orderId ;

		return this.http.get( url ) ;
	};

	saveSecondCheck(obj : object) {
		let url = GLOBAL.API.order.saveSecondCheck ;

		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
<<<<<<< HEAD
	};

	getSecondCheckResult(orderId : number | string ){
		let url = GLOBAL.API.order.getSecondCheckRst + orderId ;
		return this.http.get(url) ;
	};

};
=======
	}

  getAntiFraud(clientId: number) {
    // let url = GLOBAL.API.order.getAntiFraud + clientId;
    let url = 'http://localhost:8083/audit/td/anti/fraud/18';
    return this.http.get(url);
  }
};
>>>>>>> ab7cbd7245126754a6a22067b6f5bf78d28255f6

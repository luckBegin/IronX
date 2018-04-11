import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';
import { ObjToQuery } from '../ObjToQuery' ;

@Injectable()
export class EnumService{
	constructor(
		private http : HttpClient
	){};

	getSex(){
		let url = GLOBAL.API.enum.sex ;
		return this.http.get(url);
	};

	getMarry(){
		let url = GLOBAL.API.enum.marry ;

		return this.http.get(url) ;
	};

	getEdu(){
		let url = GLOBAL.API.enum.edu ;
		return this.http.get(url) ;
	};

	getLive(){
		let url = GLOBAL.API.enum.live ;

		return this.http.get(url) ;
	};

	getUnit(){
		let url = GLOBAL.API.enum.unit ;

		return this.http.get(url) ;
	};

	getRelation(){
		let url = GLOBAL.API.enum.relation ;
		return this.http.get(url);
	};

	getLoanType(){
		let url = GLOBAL.API.enum.loan_type ;
		return this.http.get(url) ;
	};

	getLoanWay(){
		let url = GLOBAL.API.enum.loan_useWay;
		return this.http.get(url) ;
	};

	getRepayWay(){
		let url = GLOBAL.API.enum.repay_way ;

		return this.http.get(url) ;
	};

	getRepayStatus(){
		let url = GLOBAL.API.enum.repay_status ;

		return this.http.get(url) ;
	};

	getLoanPurpose(){
		let url = GLOBAL.API.enum.loan_purpose ;
		return this.http.get(url) ;
	};

	getImgUoloadType(){
		let url = GLOBAL.API.enum.imgUploadType ;
		return this.http.get(url) ;
	};
};
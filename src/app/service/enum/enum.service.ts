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
	}
};
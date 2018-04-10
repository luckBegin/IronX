import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class Userservice{
	constructor(
		private http : HttpClient
	){};

	getList(){
		let url = GLOBAL.API.workbench.userManager ;

		return this.http.get(url) ;
	};

	getDealUserlist(){
		let url = GLOBAL.API.workbench.dealUserList;

		return this.http.get(url) ;
	}
};
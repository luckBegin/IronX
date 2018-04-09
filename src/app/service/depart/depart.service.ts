import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery'
@Injectable()
export class DepartService{
	constructor(
		private http : HttpClient
	){};

	getDepart(){
		let url = GLOBAL.API.depart.departList ;

		return this.http.get(url);
	}
};
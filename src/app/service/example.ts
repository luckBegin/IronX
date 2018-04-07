import { GLOBAL } from '../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient } from '@angular/common/http'
@Injectable()
export class WorkbenchAll{
	constructor(
		private http : HttpClient
	){}
	getList(obj : object){
	}
};
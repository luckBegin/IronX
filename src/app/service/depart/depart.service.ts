import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams , HttpHeaders} from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery'
@Injectable()
export class DepartService{
	constructor(
		private http : HttpClient
	){};

	getDepart(){
		let url = GLOBAL.API.depart.departList ;
		return this.http.get(url);
	};
	delete(id : string | number){
		let url = GLOBAL.API.depart.deleteDepart  + id ;

		return this.http.delete(url)
	};
	add(obj : object){
		let url = GLOBAL.API.depart.addDepart ;
		
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.post(url, obj , {
			headers : header
		});
	}
	edit(obj : object , id : number | string){
		let url = GLOBAL.API.depart.editDepart + id ;
		
		let header = new HttpHeaders()
			.set("Content-type" , "application/json") ;

		return this.http.put(url, obj , {
			headers : header
		});
	}
};
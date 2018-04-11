import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class ImgService{
	constructor(
		private http : HttpClient
	){};

	imgUpload(fromData : FormData){
		let url = GLOBAL.API.upload.baseUpload ;

		return this.http.post(url , fromData);
	};

	isImg(name : string){
		let reg = /png|jpg|jpeg/gi;
		return reg.test(name) ;
	};

	delImg(id : string ) {
		let url = GLOBAL.API.upload.delImg + id;
		return this.http.delete(url);
	}
};
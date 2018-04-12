import { GLOBAL } from '../../global/global_settion' ;
import { Injectable } from '@angular/core' ;
import { HttpClient , HttpParams } from '@angular/common/http';

import { ObjToQuery } from '../ObjToQuery';

import { city_json } from './city.json'
@Injectable()
export class CityService{
	constructor(
		private http : HttpClient
	){};

	getCityList(){
		return city_json ;
	};
};
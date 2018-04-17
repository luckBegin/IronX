import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../../service/storage/session_storage' ;
import { Router } from '@angular/router' ;
@Component({
	selector : "" ,
	templateUrl : './check.component.html' ,
	styleUrls : ['./check.component.less']
})
export class CheckComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router 
	){};

	ngOnInit(){
		this.checkInfo = this.sgo.get("checkInfo") ;
	};

	checkInfo : object  ;
};
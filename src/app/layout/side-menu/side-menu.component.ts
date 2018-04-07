import { Component , Input } from '@angular/core' ;
import { EmitService } from '../../service/event-emit.service' ;
import { Router } from '@angular/router' ;
@Component({
	selector : "side-menu" ,
	templateUrl : './side-menu.component.html' ,
	styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent{
	constructor(
		private emit : EmitService ,
		private router : Router
	){};
	@Input() 
		togleSwitch : boolean ;
	@Input()
		menuData : any[] ;

	urlLink : Function = (data) : void => {
		let url = data.url ;
		let title = data.title ;

		this.emit.eventEmit.emit({
			type : "title" ,
			title : title ,
			url : url 
		});

		this.router.navigate([url]) ;
	};
} 
import { Component , Input } from '@angular/core';

@Component({
	selector : "c-table" ,
	templateUrl : "./table.component.html",
	styleUrls : ["./table.component.less"] ,
})
export class TableComponent{
	@Input()
		tableData;
	icoActive : string = 'top' ;
	icoIndex : number ;
	setUp(fn , idx){
		if(this.icoActive == 'top'){
			this.icoActive = 'bottom' ;
		}else{
			this.icoActive = 'top' ;
		};
		this.icoIndex = idx ;
		fn(this.icoActive);
	};
}
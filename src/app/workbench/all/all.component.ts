import { Component ,OnInit } from '@angular/core';
import { WorkbenchAll } from '../../service/workbench/all.service'
let __this ;
@Component({
	selector : "app-all" ,
	templateUrl : './all.component.html' ,
	styleUrls : ['./all.component.less'] ,
})
export class AllComponent implements OnInit{
	constructor(
		private service : WorkbenchAll
	){} ;

	ngOnInit(){
		__this = this ;
		this.service.getList({})
			.subscribe(
				res => {
					console.log(res);
				}
			)
	};
	
	tableData = {
		showIndex : true,
		tableTitle : [
			{ name : "渠道名称" , type:"select", reflect : "qudao" , data : [{
				name : "123"
			}] , fn:function($event,data){
				console.log(data);
			}} ,
			{ name : "渠道名称"  , type:"text" ,reflect : "qudao"},
			{ name : "渠道名称"  , type:"checkbox" , fn : function(res){
				console.log(res);
			}}
		] ,
		data : [{qudao:1},{qudao:1},{qudao:1},{qudao:1},{qudao:1}],
	};

	pageChange($size : number , type : string) : void{
		
	}
};
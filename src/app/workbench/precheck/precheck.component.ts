import { Component ,OnInit } from '@angular/core';
import { WorkbenchAll } from '../../service/workbench/all.service';
import { dataFormat } from '../../format/dateFormat';
import { MsgService } from '../../service/msg/msg.service' ;
import { ActivatedRoute } from '@angular/router';
import { PrecheckSearchModel } from './precheck-search.model' ;
let __this ;
@Component({
	selector : "app-all" ,
	templateUrl : './precheck.component.html' ,
	styleUrls : ['./precheck.component.less'] ,
})
export class PrecheckComponent implements OnInit{
	constructor(
		private service : WorkbenchAll ,
		private msg : MsgService ,
		private routerInfo : ActivatedRoute
	){} ;
	ngOnInit(){
		__this = this ;

		this.getList() ;
	};

	searchModel : PrecheckSearchModel = new PrecheckSearchModel();

	tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "" , type:"checkbox" , check : true , fn : function(data){
				console.log(data);
			}} ,
			{ name : "操作" , type:"select", reflect : "qudao" , data : [{name : "通过"},{name : "拒绝"}] , 
			fn:function($event,data){
				console.log($event);
				console.log(data);
			}} ,
			{ name : "订单编号"  , type:"text" ,reflect : "orderNo"},
			{ name : "申请人"  , type:"text" ,reflect : "userName"},
			{ name : "身份证号"  , type:"text" ,reflect : "idCard"},
			{ name : "手机号"  , type:"text" ,reflect : "phoneNumber"},
			{ name : "进件时间"  , type:"text" ,reflect : "createTime"},
			{ name : "网点"  , type:"text" ,reflect : "departmentName"},
			{ name : "产品名称"  , type:"text" ,reflect : "productName"},
			{ name : "申请金额"  , type:"text" ,reflect : "applyMoney"},
			{ name : "审批金额"  , type:"text" ,reflect : "agreeMoney"},
			{ name : "客户经理"  , type:"text" ,reflect : "createUser"},
			{ name : "流程节点"  , type:"text" ,reflect : "statusDesc"},
			{ name : "流转时间"  , type:"text" ,reflect : "modifyTime"},
			{ name : "处理人"  , type:"text" ,reflect : "modifyUser"},

		] ,
		data : [],
	};

	totalSize : number = 0 ;

	getList(){
		this.service.getOrderList(this.searchModel , 1)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data'] ;
						this.totalSize = res['page']?res['page']['totalNumber']:0 ;
						this.isSearchLoad = false ;
					}else{
						this.msg.warn('获取数据列表出错');
					};
				}
			)
	};

	isSearchLoad : boolean = false ;

	search(){
		this.getList() ;
	};
	reset(){
		this.searchModel = new PrecheckSearchModel();
		this.getList() ;
	}
};
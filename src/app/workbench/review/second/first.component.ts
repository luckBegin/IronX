import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { WorkbenchAll } from '../../../service/workbench/all.service';
import { FirstSearchModel } from './first.search.model';
import { dataFormat } from '../../../format/dateFormat';
import { MsgService } from '../../../service/msg/msg.service' ;
import { ActivatedRoute } from '@angular/router';

import { DepartService } from '../../../service/depart/depart.service' ;
import { ProductService } from '../../../service/product/product.service' ;
import { Userservice } from '../../../service/user/user.service'
import { SessionStorageService } from '../../../service/storage/session_storage'
import { DateReflect } from '../../../service/date-reflect' ;
let __this ;

const pass = {
	name : "通过" ,
	fn : function(item){
		__this.passModel = true ;
		__this.selectItem = item ;
	}
};

const refues = {
	name : "拒绝" ,
	fn : function(item){
		__this.refuseModel = true ;
		__this.selectItem = item ;
	}
};

const cancel = {
	name : "客户取消" ,
	fn : function(item){

	}
};

const profile_remake = {
	name : "资料补录" ,
	fn : function(item){
		__this.lgo.set("proInfo" , item);
		__this.router.navigate(["/workbench/dataRemake",item.id]);
	}
};

const record = {
	name : "处理记录" ,
	fn : function(item){

	}
};

const detail = {
	name : "查看详情" ,
	fn: function(item){
		__this.sgo.set("checkInfo" , item) ;
		__this.router.navigate(['/workbench/check' , item.id]);
	}
};
const reback = {
	name : "退回订单" ,
	fn : function(item){

	}
};

const has_pay = {
	name : "线下已放款" ,
	fn : function(item){
	}
};

const profile_trans = {
	name : "移交资料" ,
	fn : function(item){

	}
};

const rightNow = {
	name : "马上审批" ,
	fn : function(item){
		__this.sgo.set("checkInfo" , item) ;
		__this.router.navigate(['/workbench/approveOrder' , item.id]);
	}
};

const submit_order = {
	name : "提交订单" ,
	fn : function(item){

	}
};
const verify = {
	name : "客户确认" ,
	fn : function(item){

	}
};
const operData = [
	{desc:"待预审" , status : "1" , oper : [pass , refues , cancel] } ,
	{desc:"待补录" , status : "2" , oper : [profile_remake , cancel] } ,
	{desc:"待提交" , status : "3" , oper : [detail ,submit_order,cancel , record] } ,
	{desc:"待初审" , status : "4" , oper : [detail , rightNow , reback ,cancel , record]} ,
	{desc:"待复审" , status : "5" , oper : [detail , rightNow , reback ,cancel , record]} ,
	{desc:"待终审" , status : "6" , oper : [detail , rightNow , reback ,cancel , record]} ,
	{desc:"待尽调" , status : "7" , oper : [detail , rightNow , reback , cancel ,record] } ,
	{desc:"待客户确认" , status : "8" , oper : [detail ,verify ,cancel , reback , record ] } ,
	{desc:"放款中" , status : "9" , oper : [detail , profile_trans , reback , cancel , record] } ,
	{desc:"待确认放款" , status : "10" , oper : [detail ,has_pay , reback , record]} ,
	{desc:"审批拒绝" , status : "11", oper :[detail , cancel , record]} ,
	{desc:"已取消" , status : "12", oper :[detail , cancel , record]} ,
	{desc:"已流单" , status : "13", oper :[detail , cancel , record]} ,
];
@Component({
	selector : "app-first"  ,
	templateUrl: "./first.component.html" ,
	styleUrls : ["./first.component.less"]
})
export class  FirstComponent implements OnInit{
	constructor(
		private service : WorkbenchAll,
		private msg : MsgService ,
		private sgo : SessionStorageService ,
		private router : Router
	){};

	ngOnInit(){
		this.getData() ;
		__this = this ;
	};

	searchModel : FirstSearchModel = new FirstSearchModel();

	tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "操作" , type:"select", reflect : "qudao" , data : operData , fn:function($event,data , select){
				let _idx = $event.split(",") ;
				operData[_idx[0]].oper[_idx[1]].fn(data) ;
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
			{ name : "处理人"  , type:"text" ,reflect : "modifyUserName"},

		] ,
		data : [],
	};

	totalSize : number ;

	getData() : void {
		this.service.getOrderList(this.searchModel , 4)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data'] ;
						this.totalSize = res['page']?res['page']['totalNumber']:0 ;
					}else{
						this.msg.warn('获取数据列表出错');
					};
				}
			);
	};
	reset(){
		this.searchModel = new FirstSearchModel();
		this.getData() ;
	}
};
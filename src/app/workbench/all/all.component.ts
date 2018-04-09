import { Component ,OnInit } from '@angular/core';
import { WorkbenchAll } from '../../service/workbench/all.service';
import { AllSearchModel } from './all-search.model';
import { dataFormat } from '../../format/dateFormat';
import { MsgService } from '../../service/msg/msg.service' ;
import { ActivatedRoute } from '@angular/router';


import { DepartService } from '../../service/depart/depart.service' ;
import { ProductService } from '../../service/product/product.service' ;

import { DateReflect } from '../../service/date-reflect' ;
let __this ;
@Component({
	selector : "app-all" ,
	templateUrl : './all.component.html' ,
	styleUrls : ['./all.component.less'] ,
})
export class AllComponent implements OnInit{
	constructor(
		private service : WorkbenchAll ,
		private msg : MsgService ,
		private routerInfo : ActivatedRoute ,
		private departSer : DepartService ,
		private productSer : ProductService
	){} ;

	ngOnInit(){
		__this = this ;

		this.activeState = this.routerInfo.snapshot.params['type'];
		this.getData() ;
		this.getDepart();

	};
	searchModel : AllSearchModel = new AllSearchModel() ;

	totalSize : number = 0 ;

	tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "操作" , type:"select", reflect : "qudao" , data : [{
				name : "123"
			}] , fn:function($event,data){
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

	getData() : void {
		this.service.getOrderList(this.searchModel , this.activeState)
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

	pageChange($size : number , type : string) : void{
		if(type == 'size'){
			this.searchModel.pageSize = $size ;
		};

		if(type == 'page'){
			this.searchModel.currentPage = $size ;
		};

		this.getData() ;
	};

	menuType : object[] = [
		{desc:"待预审" , status : "1"} ,
		{desc:"待补录" , status : "2"} ,
		{desc:"待提交" , status : "3"} ,
		{desc:"待初审" , status : "4"} ,
		{desc:"待复审" , status : "5"} ,
		{desc:"待终审" , status : "6"} ,
		{desc:"待尽调" , status : "7"} ,
		{desc:"待客户确认" , status : "8"} ,
		{desc:"放款中" , status : "9"} ,
		{desc:"待确认放款" , status : "10"} ,
		{desc:"审批拒绝" , status : "11"} ,
		{desc:"已取消" , status : "12"} ,
		{desc:"已流单" , status : "13"} ,
	] ;

	activeState : number;
	
	changeType(idx : number) : void{
		this.activeState = idx ;
		this.getData();
	};

	reset(){
		this.searchModel = new AllSearchModel() ;
		this.getData() ;
	};

	search(){
		this.getData() ;
	};

	// select option 网点
	departList : object[] = []; 
	getDepart(){
		this.departSer.getDepart()
			.subscribe(
				res => {
					if(res['success'] == true){
						res['data'].forEach((index,item) => {
							let _obj = {} ;
							_obj['name'] = item.name ;
							_obj['id'] = item.id;
							this.departList.push(_obj); 
						});
						this.departList = res['data'] ;
					}else{
						this.msg.warn("获取部门数据失败");
					};
				}
			)
	};

	//select option 产品
	productList :object[] = [] ;
	getProduct(){
		this.productSer.getList({})
			.subscribe(
				res => {
					if(res['success'] == true){
					}else{
						this.msg.warn("获取产品数据失败") ;
					}
				}
			)
	};
};
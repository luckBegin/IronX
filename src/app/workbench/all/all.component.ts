import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { WorkbenchAll } from '../../service/workbench/all.service';
import { AllSearchModel } from './all-search.model';
import { dataFormat } from '../../format/dateFormat';
import { MsgService } from '../../service/msg/msg.service' ;
import { ActivatedRoute } from '@angular/router';


import { DepartService } from '../../service/depart/depart.service' ;
import { ProductService } from '../../service/product/product.service' ;
import { Userservice } from '../../service/user/user.service'
import { SessionStorageService } from '../../service/storage/session_storage'
import { DateReflect } from '../../service/date-reflect' ;
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
		// __this.sgo.set("proInfo" , item);
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
	name : "马上尽调" ,
	fn : function(item){

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
		private productSer : ProductService,
		private usrSer : Userservice ,
		private router : Router,
		private sgo : SessionStorageService
	){
		__this = this ;
	} ;

	ngOnInit(){

		this.activeState = this.routerInfo.snapshot.params['type'];
		this.getData() ;
		this.getDepart();
		this.getProduct();
		this.getUserMgr() ;
		this.getProcess();
		this.getDealUserList();
	};

	menuType : object[] = operData;

	searchModel : AllSearchModel = new AllSearchModel() ;

	totalSize : number = 0 ;

	tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "操作" , type:"select", reflect : "qudao" , data : operData , fn:function($event,data , select){
				let _idx = $event.split(",") ;
				operData[_idx[0]].oper[_idx[1]].fn(data) ;
			}} ,
			{ name : "订单编号"  , type:"text" ,reflect : "orderNo" , sort:true , sortFn : function(){
				
			}},
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

	activeState : number;
	
	changeType(idx : number) : void{
		this.activeState = idx ;
		this.reset();
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
						let map = {
							name : "name" ,
							id : "id"
						} ;
						this.departList = DateReflect(map , res['data']) ;
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
						let map = {
							productName : "name" ,
							id : "id"
						} ;
						this.productList = DateReflect(map, res['data']) ;
					}else{
						this.msg.warn("获取产品数据失败") ;
					};
				}
			);
	};

	// select option 客户经理
	userManagerList : object[] = [] ;
	getUserMgr(){
		this.usrSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						let map = {
							name : "name" ,
							id : "id"
						};
						this.userManagerList = DateReflect(map , res['data']) ;
					}else{
						this.msg.warn("获取客户经理失败");
					}
				}
			)
	};

	// 流程节点
	processList :object[] = [] ;
	getProcess(){
		this.service.getOrderStatus()
			.subscribe(
				res => {
					if(res['success'] == true){
						let _arr = [] ;

						for(let keys in res['data']){
							_arr.push({
								id : keys ,
								name : res['data'][keys]
							});
						};
						this.processList = _arr ;
					}else{
						this.msg.warn("获取流程节点失败") ;
					}
				}
			)
	};

	// 处理人
	dealUserList : object[] = [] ;
	getDealUserList(){
		this.usrSer.getDealUserlist()
			.subscribe(
				res => {
					if(res['success'] == true){
						let map = {
							name : "name" ,
							id : "id"
						} ;
						this.dealUserList = DateReflect(map , res['data'])
					}else{
						this.msg.warn("获取处理人员信息失败");
					}
				}
			)
	};

	selectItem : object ;

	passModel : boolean = false ;


	pass():void {
		let id = this.selectItem['id'] ;
		let obj = {
			orderStatus:this.selectItem['status'] ,
			opinion : "" 
		}
		this.service.pass(id , obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.passModel = true ;
						this.msg.notifySuccess("操作成功" , '该订单已通过审核');
					}else{
						this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
					};
				}
			)
	};

	refuseModel : boolean = false ;

	refuse(){
		let id = this.selectItem['id'] ;
		let obj = {
			opinion : "" 
		};

		this.service.pass(id ,obj )
			.subscribe(
				res => {
					if(res['success'] == true){
						this.refuseModel = true ;
						this.msg.notifySuccess("操作成功" , '该订单已拒绝');
					}else{
						this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
					};
				}
			)
	}
};
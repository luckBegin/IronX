import { Component ,OnInit } from '@angular/core';
import { WorkbenchAll } from '../../service/workbench/all.service';
import { dataFormat } from '../../format/dateFormat';
import { MsgService } from '../../service/msg/msg.service' ;
import { ActivatedRoute , Router } from '@angular/router';
import { PrecheckSearchModel } from './precheck-search.model' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service' ;
import { SessionStorageService } from '../../service/storage/session_storage';
import { DepartService } from '../../service/depart/depart.service';
import { ProductService } from '../../service/product/product.service';

import{ OrderSevice } from '../../service/order/order.service';
import { MenuService } from '../../service/menu/menu.service' ;

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
		__this.orderBack = true ;
		__this.selectOrder = item ;
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
		__this.router.navigate(['/workbench/finalCheck' , item.id]);
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
		__this.sgo.set("checkInfo" , item) ;
		__this.router.navigate(['/workbench/usrVerify' , item.id]);
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
	templateUrl : './verify.component.html' ,
	styleUrls : ['./verify.component.less'] ,
})
export class VerifyComponent implements OnInit{
	constructor(
		private service : WorkbenchAll ,
		private msg : MsgService ,
		private routerInfo : ActivatedRoute ,
		private fb : FormBuilder,
		private sgo : SessionStorageService ,
		private router : Router,
		private departSer : DepartService ,
		private proSer : ProductService ,
		private orderSer : OrderSevice ,
		private menu : MenuService
	){} ;
	ngOnInit(){
		__this = this ;

		this.getList() ;
		this.getDepart() ;
		this.getProlist() ;
		this.getManager() ;
		this.getDealUser() ;
		this.validateForm = this.fb.group({
			"rejectionReason" : [null , [Validators.required]] ,
			"opinion" : [ null ]
		});
		this.bakckForm = this.fb.group({
			destOrderStatus:[null],
			opinion:[null],
			orderStatus:[null],
		});

	};
	validateForm : FormGroup ;
	searchModel : PrecheckSearchModel = new PrecheckSearchModel();

	tableData : Object = {
		showIndex : true,
		tableTitle : [
			// { name : "操作" , type:"select", reflect : "qudao" , data : operData , fn:function($event,data , select){
			// 	let _idx = $event.split(",") ;
			// 	operData[_idx[0]].oper[_idx[1]].fn(data) ;
			// }} ,
			{ name : "订单编号"  , type:"text" ,reflect : "orderNo", color:"#1890ff" , fn : item => {
				let state = item.status ; 
				if(state){
					__this.sgo.set("checkInfo" , item) ;
					__this.menu.profileCheck(item.id , item.status)  ;
				}else{
					__this.msg.warn("检测不到该订单的状态码,请联系系统管理员") ;
				};
			}},
			{ name : "申请人"  , type:"text" ,reflect : "userName"},
			{ name : "身份证号"  , type:"text" ,reflect : "idCard"},
			{ name : "手机号"  , type:"text" ,reflect : "phoneNumber"},
			{ name : "进件时间"  , type:"text" ,reflect : "createTime" , filter : function(val){
				return dataFormat(val['createTime'])
			}},
			{ name : "网点"  , type:"text" ,reflect : "departmentName"},
			{ name : "产品名称"  , type:"text" ,reflect : "productName"},
			{ name : "申请金额"  , type:"text" ,reflect : "applyMoney"},
			{ name : "审批金额"  , type:"text" ,reflect : "agreeMoney"},
			{ name : "客户经理"  , type:"text" ,reflect : "createUser"},
			{ name : "流程节点"  , type:"text" ,reflect : "statusDesc"},
			{ name : "流转时间"  , type:"text" ,reflect : "modifyTime",filter : function(val){
				return dataFormat(val['modifyTime'])
			}},
			{ name : "处理人"  , type:"text" ,reflect : "modifyUserName"},
		] ,
		data : [],
	};
	totalSize : number = 0 ;
	getList(){
		this.service.getOrderList(this.searchModel , 8)
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
						this.passModel = false ;
						this.msg.notifySuccess("操作成功" , '该订单已通过预审');
						this.getList() ;
					}else{
						this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
					};
				}
			)
	};
	refuseModel : boolean = false ;
	refuse(){
		let id = this.selectItem['id'];
		let obj = this.validateForm.value ; 
		obj['orderId'] = id ;
		this.service.refuse(obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.refuseModel = false ;
						this.msg.notifySuccess("操作成功" , '该订单已拒绝');
						this.getList();
					}else{
						this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
					};
				}
			)
	};

	cancelModel :boolean = false ;
	cancel(){
		let id = this.selectItem['id'];
		this.service.cancel(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.cancelModel = false ;
						this.msg.notifySuccess("操作成功",'该订单已标记为客户取消');
						this.getList();
					}else{
						this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
					};
				}
			)
	};

	optionDeapart : object[] ;
	getDepart(){
		this.departSer.getDepart()
			.subscribe(
				res => {
					if(res['success'] == true){
						let obj = res['data'] ;
						recursion(res['data']);
						let arr = [] ; 
						makeDepart(res['data'] , arr) ;
						this.optionDeapart = arr ;
					}else{
						this.msg.error("获取部门结构信息出错,原因:" + res['msg']) ;
					}
				}
			)
	};
	proList : object[] ; 
	getProlist(){
		this.proSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.proList = res['data'] ;
					}else{
						this.msg.error("获取产品信息出错,原因:" + res['msg']) ;
					}
				}
			)
	};
	managerList : object[] ;
	getManager(){
		this.service.gettUserManage()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.managerList = res['data'] ;
					}else{
						this.msg.error("获取客户经理出错,原因:" + res['msg']) ;
					}
				}
			)
	};

	dealUser : object[] ;
	getDealUser(){
		this.service.getDealUser()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.dealUser = res['data'] ;
					}else{
						this.msg.error("获取处理人列表出错,原因:" + res['msg']) ;
					}
				}
			)
	};

	bakckForm : FormGroup;
	orderBack : boolean = false ;
	selectOrder : object ;

	backSure(){
		let id = this.selectOrder['id'] ; 
		let postData = this.bakckForm.value ;
		postData['orderStatus'] = this.selectOrder['status'] ;
		this.orderSer.orderBack(id,postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功") ;
						this.getList() ;
						this.orderBack = false ; 
					}else{
						this.msg.error('操作失败,原因:' +res['msg']);
					};
				}
			)
	}
};
const recursion = function(obj){
	obj.forEach( (item,index) => {
		item['title'] = item.name ;
		item['key'] = item.id ;

		if(item.children){
			recursion(item.children);
		};
	});
};

const makeDepart = function(obj ,tar){
	obj.forEach( (item,index) => {
		let _obj = {
			value : item.name ,
			id : item.id
		};
		tar.push(_obj) ;
		if(item.children){
			makeDepart(item.children , tar);
		};
	});
};
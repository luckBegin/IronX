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
import { MenuService } from '../../service/menu/menu.service' ;
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
		private routerInfo : ActivatedRoute ,
		private fb : FormBuilder,
		private sgo : SessionStorageService ,
		private router : Router,
		private departSer : DepartService ,
		private proSer : ProductService ,
		private menu : MenuService ,
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
	};
	validateForm : FormGroup ;
	searchModel : PrecheckSearchModel = new PrecheckSearchModel();

	tableData : Object = {
		showIndex : true,
		tableTitle : [
			// { name : "操作" , type:"selectArr", reflect : "qudao" , data : ["通过" , "拒绝" , "客户取消"] , 
			// fn:function($event,data){
			// 	__this.selectItem = data ;
			// 	if($event == '通过'){
			// 		__this.passModel = true ;
			// 	};
			// 	if($event == '拒绝'){
			// 		__this.refuseModel = true ;
			// 	};
			// 	if($event == '客户取消'){
			// 		__this.cancelModel = true ;
			// 	}
			// }} ,
			{ name : "订单编号"  , type:"text" ,reflect : "orderNo" , color:"#1890ff" , fn : item => {
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
			{ name : "进件时间"  , type:"text" ,reflect : "createTime" , filter : item => {
				return dataFormat(item['createTime']) ;
			}},
			{ name : "网点"  , type:"text" ,reflect : "departmentName"},
			{ name : "客户经理"  , type:"text" ,reflect : "createUser"},
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
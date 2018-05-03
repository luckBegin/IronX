import { Component ,OnInit } from '@angular/core' ;
import { DepartService } from '../../service/depart/depart.service';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service';
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { Userservice } from '../../service/user/user.service' ;
import { Router } from '@angular/router' ;
import { NzTreeNode } from 'ng-zorro-antd';
import { StuffModel } from './stuffModel' ;
import { MenuRemoteServce } from '../../service/menu_remote/menu.service' ;
import { ProductService } from '../../service/product/product.service'
let __this ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './org.component.html' ,
	styleUrls : ['./org.component.less']
})
export class OrgComponent implements OnInit{
	constructor(
		private departSer : DepartService ,
		private msg : MsgService ,
		private fb : FormBuilder ,
		private emit : EmitService,
		private router : Router ,
		private sgo : SessionStorageService ,
		private usrSer : Userservice ,
		private menuRemote : MenuRemoteServce ,
		private proSer : ProductService
	){};

	ngOnInit(){
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "组织结构" ,
			url : "/permission/org"
		});

		this.getDepart() ;
		this.getStaff() ;

		this.buildStuffForm() ;
		this.getRoleList() ;
		this.getAllMenu() ;
		this.getProlist();
		__this = this ;

		this.validateForm = this.fb.group({
			"name":[null , [Validators.required]],
			"parentId": [null , [Validators.required]],
			"parentName" : [null]
		});
	};

	treeInfo : NzTreeNode[] ;
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

						this.treeInfo = [new NzTreeNode(res['data'][0])] ;
					}else{
						this.msg.error("获取部门结构信息出错,原因:" + res['msg']) ;
					}
				}
			)
	};
	roleList : object[] ;
	getRoleList(){
		this.usrSer.getRoleList()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData_role['data']= res['data'] ; 
						this.roleList = res['data'] ;
					}else{
						this.msg.error("获取角色信息出错,原因:" + res['msg']) ;
					}
				}
			)
	}
	stuffSearch : StuffModel = new StuffModel() ;
	pageChange($size : number , type : string) : void{
		if(type == 'size'){
			this.stuffSearch.pageSize = $size ;
		};

		if(type == 'page'){
			this.stuffSearch.currentPage = $size ;
		};
		this.getStaff() ;
	};
	tableData : Object = {
		tableTitle : [
			{ name : "操作" , type:"selectArr", reflect : "qudao" , data : ["冻结|解冻" , "编辑" , "重置密码"]  , fn:function($event,data){
				if($event == '编辑'){
					let stuffInfo  = data ;
					__this.stuffBoxShow = true ;
					__this.stuffForm.patchValue({
						"username" : stuffInfo.username, 
						"name" : stuffInfo.name, 
						"telephone" : stuffInfo.telephone, 
						"idCard" : stuffInfo.idCard, 
						"departmentId" : stuffInfo.departmentId.toString(), 
						"roleIds" : stuffInfo.roles
					});
				};

				if($event == '冻结|解冻'){
					__this.freezeMark = true ;
					__this.stuffInfo = data ;
				};

				if($event == '重置密码'){
					__this.resetPassMark = true ;
					__this.stuffInfo = data ;
					__this.newPass = '' ;
				};

			}} ,
			{ name : "用户名"  , type:"text" ,reflect : "username" },
			{ name : "真实姓名"  , type:"text" ,reflect : "name"},
			{ name : "手机号"  , type:"text" ,reflect : "phone"},
			{ name : "身份证号码"  , type:"text" ,reflect : "idCard"},
			{ name : "角色"  , type:"text" ,reflect : "roles"},
			{ name : "所属网点"  , type:"text" ,reflect : "department.name" , filter : function(val){
				return val['department']['name'];
			}},
			{ name : "状态"  , type:"text" ,reflect : "statusDesc"},
			{ name : "备注"  , type:"text" ,reflect : "remark"},
		] ,
		data : [],
	};
	totalSize : number ;
	getStaff(){
		this.usrSer.getStuff(this.stuffSearch)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data'] ;
						this.totalSize = res['page']?res['page']['totalNumber'] : 0;
					}else{
						this.msg.error("获取员工信息出错,原因:" + res['msg']) ;
					};
				}
			);
	};
	reset(type){
		if(type == 'stuff'){
			this.stuffSearch = new StuffModel ;
			this.getStaff() ;
		};
	};
	search(type){
		if(type == 'stuff'){
			this.getStaff() ;
		};
	};
	static isTimes( control: FormControl ){
		let val = control.value;
		return (val.length == 0)?{ "invalidLen" : true } : null ;
	};
	stuffForm : FormGroup ;
	buildStuffForm(){
		this.stuffForm = this.fb.group({
			"username" : [ null, [ Validators.required ] ] ,
			"name" : [null , [Validators.required]] ,
			"telephone" : new FormControl('', [
					Validators.required ,
					Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)
				]
			),
			"idCard" : new FormControl('', [
					Validators.required ,
					Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)
				]
			),
			"password" : [null , [Validators.required]] ,
			"departmentId" : [null , [Validators.required]] ,
			"roleIds" : [null , [Validators.required]] ,
			"productIds" : [null , [Validators.required]]
		});
	};
	addNewStuff(){
		this.stuffBoxShow = true ;
		this.stuffForm.reset() ;
	};
	stuffBoxShow : boolean = false ;
	stuffEditMark : boolean = false ;
	freezeMark : boolean = false ;
	resetPassMark : boolean = false ;
	stuffInfo : object ;

	randomPass(size){
		var seed = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z',
		'a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z',
		'2','3','4','5','6','7','8','9'
		);
		let seedlength = seed.length;
		var createPassword = '';
		for (let i=0;i<size;i++) {
		let j = Math.floor(Math.random()*seedlength);
			createPassword += seed[j];
		};
		this.stuffForm.patchValue({
			"password" : createPassword 
		});
	};

	makeNewStuff(){
		let obj = this.stuffForm.value ;
		this.usrSer.addStuff(obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("创建成功") ;
						this.stuffBoxShow = false ;
						this.getStaff();
					}else{
						this.msg.error("创建失败,原因:"+res['msg']) ;
					};
				}
			);
	};
	freeOper(){
		let id = this.stuffInfo['id'];
		let status = this.stuffInfo['status'];
		if(status == '1'){
			this.usrSer.freeze(id)
				.subscribe(
					res => {
						if(res['success'] == true){
							this.msg.success("操作成功");
							this.freezeMark = false ;
							this.getStaff();
						}else{
							this.msg.error("操作失败,原因:" + res['msg']) ;
						};
					}
				)
		}else{
			this.usrSer.unFreeze(id)
				.subscribe(
					res => {
						if(res['success'] == true){
							this.msg.success("操作成功");
							this.freezeMark = false ;
							this.getStaff();
						}else{
							this.msg.error("操作失败,原因:" + res['msg']) ;
						};
					}
				)
		};
	};

	selectItem : object ;
	showMenu($event){
		let el = <Element>document.querySelector('.menu') ;
		el['style'].top = $event.event.screenY - 209 + 'px' ;
		el['style'].left = $event.event.screenX + 70 + 'px' ;
		el['style'].display = 'block' ;

		this.selectItem = $event.node ;
		console.log($event) ;
	};
	hideMenu(){
		let el = <Element>document.querySelector('.menu') ;
		el['style'].display= 'none';
	};

	refuseModel : boolean = false ;
	removeItem(){
		this.hideMenu() ;
		this.refuseModel = true ;
	};
	deleteNode(){
		let id = this.selectItem['key'] ;

		this.departSer.delete(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.refuseModel = false ;
						this.getDepart();
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	};

	validateForm : FormGroup ;
	infoBoxShow : boolean = false ;
	editMark : boolean ;
	addItem(){
		this.hideMenu() ;
		this.infoBoxShow = true ;
		this.editMark = false; 
		this.validateForm.reset() ;
		this.validateForm.patchValue({
			'parentId' : this.selectItem['key'],
			'parentName' : this.selectItem['title']
		});
	};
	editItem(){
		this.hideMenu() ;
		this.infoBoxShow = true ;
		this.editMark = true; 
		this.validateForm.reset() ;
		this.validateForm.patchValue({
			'parentId' : this.selectItem['parentNode']['key'],
			'parentName' : this.selectItem['parentNode']['title'] ,
			"name" : this.selectItem['title']
		});
	}
	makeNew(){
		let val = this.validateForm.value ;
		this.departSer.add(val)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.infoBoxShow = false ;
						this.getDepart();
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	};
	save(){
		let val = this.validateForm.value ;
		this.departSer.edit(val , this.selectItem['key'])
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.infoBoxShow = false ;
						this.getDepart();
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	};

	selectRole : object; 
	tableData_role : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "角色"  , type:"text" ,reflect : "nameZh"},
			{ name : "人数"  , type:"text" ,reflect : "employeeCount"},

		] ,
		data : [],
		btnGroup : {
			title : "操作" ,
			data : [
				{
					textColor : "#80accf",
					name : "编辑",
					ico : "anticon anticon-edit" ,
					bindFn : function(item){
						__this.selectRole = item ;

						__this.roleModel['nameZh'] = item['nameZh'] ;
						__this.roleModel['name'] = item['name'] ;
						__this.roleModel['id'] = item['id'] ;

						__this.getRoleMenu(item.id) ;
					}
				},
				{
					textColor : "#f62121",
					name : "删除",
					ico: "anticon anticon-delete" ,
					bindFn : function(item){
						__this.selectRole = item ;
						__this.delRole = true ;
					}
				}
			]
		}
	};
	delRole : boolean = false ; 
	editRole : boolean = false ;
	delRoleFn(){
		let id = this.selectRole['id'] ;
		this.usrSer.delRole(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.delRole = false ;
						this.getRoleList();
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	};

	menuTree : NzTreeNode[] ;
	getAllMenu(){
		this.menuRemote.getAllMenu()
			.subscribe(
				res => {
					if(res['success'] == true){
						let obj = res['data']
						makeMenu(obj) ;
						let _obj = [] ;
						for(let keys in obj){
							_obj.push( new NzTreeNode(obj[keys])) ;
						};
						this.menuTree = _obj ;
					}else{
						this.msg.error("获取操作菜单,原因:" + res['msg']) ;
					};
				}
			)
	}
	roleModel : object = {
		name : "" ,
		nameZh : "" , 
		menuIds : [],
	};
	choseMenu($event){
		let id = $event.node.key ;
		let idx = this.roleModel['menuIds'].indexOf(id) ;
		if(idx > -1){
			this.roleModel['menuIds'].splice(idx , 1) ;
		}else{
			this.roleModel['menuIds'].push(id) ;
		};
	};
	expandKey : number[];
	getRoleMenu(id){
		this.menuRemote.getRoleMenu(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						__this.editRole = true ;
						let _arr = [] ;
						makeMenus(res['data'] , _arr) ;

						this.expandKey = _arr ;

						this.roleModel['menuIds'] = _arr ;
					}else{
						this.msg.error("获取角色操作菜单失败,原因:" + res['msg']) ;
					};
				}
			)
	}
	editRoleFn(){
		let postData = this.roleModel ;
		this.usrSer.editRole(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.editRole = false ;
						this.getRoleList();
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	};

	passMark : boolean = false ;
	checked : boolean = true ;
	checked2 : boolean = false ;
	newPass : string = '' ;
	changePassNew(){
		let id = this.stuffInfo['id']
		let newPassword =  '' ;
		if(this.checked == true){
			newPassword = 'sd123456'
		};
		if(this.checked2 == true && !this.newPass){
			this.msg.error("新密码不能为空") ;
			return ;
		};
		if(this.checked2 == true && this.newPass){
			newPassword = this.newPass ;
		};

		this.usrSer.changePass(id , newPassword)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功,请重新登录") ;
						this.sgo.remove(['loginInfo']) ;
						this.router.navigate(['/login']) ;
					}else{
						this.msg.error("操作失败,原因" + res['msg']) ;
					};
					this.passMark = false; 
				}
			);
	};

	proList : object[] ;
	getProlist(){
		this.proSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.proList = res['data']
					}else{
						this.msg.error("获取角色操作菜单失败,原因:" + res['msg']) ;
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


const makeMenu = function(obj){
	obj.forEach( (item,index) => {

		item.title = item.name ; 
		item.key = item.id ;
		if(item.children){
			makeMenu(item.children);
		};
	});
};

const makeMenus= function(obj ,tar){
	obj.forEach( (item,index) => {
		let _obj = item.id
		tar.push(_obj) ;
		if(item.children){
			makeMenus(item.children , tar);
		};
	});
};
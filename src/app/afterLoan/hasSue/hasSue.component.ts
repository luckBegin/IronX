import { Component ,OnInit } from '@angular/core' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service';
import { Router } from '@angular/router' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { SearchModel } from './search.model';
import { AfterLoanService } from '../../service/afterLoan/afterLoan.service' ;
import { ProductService } from '../../service/product/product.service' ;
import { DepartService } from '../../service/depart/depart.service' ;
let __this ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './hasSue.component.html' ,
	styleUrls : ['./hasSue.component.less']
})
export class HasSueComponent implements OnInit{
	constructor(
		private loanSer : AfterLoanService ,
		private msg : MsgService ,
		private fb : FormBuilder ,
		private emit : EmitService,
		private router : Router ,
		private sgo : SessionStorageService ,
		private proSer : ProductService ,
		private departSer : DepartService
	){};

	// static OrderNoCheck( control: FormControl ){
	// 	// let val = control.value.substring(0 , val['length'] - 4);
	// 	// return (val % 6 == 0)?null: { "invalidNumber" : true } ;
	// };
	ngOnInit(){
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "个人中心" ,
			url : "/permission/personal"
		});

		this.getData() ;
		this.getDepart() ;
		this.getProList() ;
		__this = this ;

		this.submitForm = this.fb.group({
			"orderNumber" : [null , [Validators.required]] ,
			"proposerName" : [null , [Validators.required]] ,
			"idNumber" : [ null ,[Validators.required]] ,
			"phoneNumber" : [null , [ Validators.required]] ,
			"clientManager" : [null , [Validators.required]] ,
			"branchName" : [null , [Validators.required]],
			"productName" : [null , [Validators.required]],
			"applyAmount" : [null , [Validators.required]] ,
			"ratifyAmount" : [null , [Validators.required]] ,
			"enterDate" : [null , [Validators.required]] ,
			"currentBalance" : [null , [Validators.required]] ,
			"interestPenalty" : [null , [Validators.required]] ,
			"loanDate" : [null , [Validators.required]],
			"totalPeriods" : [null , [Validators.required]],
			"currentPeriods" : [null , [Validators.required]],
			"planRepaymentDate" : [null , [Validators.required]],
			"realRepaymentDate" : [null , [Validators.required]],
			"hasDue" : [null , [Validators.required]],
			"dueDay" : [null , [Validators.required]],
			"repayStatus" : [null , [Validators.required]],
			"hasClean" : [null , [Validators.required]],
			"overdueFine" : [null , [Validators.required]],
		})
	} ;
	submitForm : FormGroup ;
	searchModel : SearchModel = new SearchModel() ;


	totalSize : number ;
		tableData : Object = {
		showIndex : false,
		tableTitle : [
			{ name : "来源"  , type:"text" ,reflect : "source"},
			{ name : "订单编号"  , type:"text" ,reflect : "orderNumber"},
			{ name : "网点名称"  , type:"text" ,reflect : "branchName"},
			{ name : "确认到账日期"  , type:"text" ,reflect : "confirmDate" , filter : function(val){
				return dataFormat(val['confirmDate'])
			}},
			{ name : "当月应还"  , type:"text" ,reflect : "currentBalance"},
			{ name : "当月期数"  , type:"text" ,reflect : "currentPeriods" , filter : function(val){
				return val.currentPeriods + "/" + val.totalPeriods;
			}},
			{ name : "是否逾期"  , type:"text" ,reflect : "hasDue" , filter : function(val){
				return val.hasDue == 0 ? "否":"是" ;
			}},
			{ name : "逾期天数"  , type:"text" ,reflect : "dueDay"},
			{ name : "进件时间"  , type:"text" ,reflect : "enterDate" , filter : function(val){
				return dataFormat(val['enterDate']) ;
			}},
			{ name : "身份证"  , type:"text" ,reflect : "idNumber" },
			{ name : "罚息"  , type:"text" ,reflect : "interestPenalty"},
			{ name : "放款日期"  , type:"text" ,reflect : "loanDate" , filter : function(val){
				return dataFormat(val['loanDate']) ;
			}},
			{ name : "滞纳金"  , type:"text" ,reflect : "overdueFine"},
			{ name : "手机号"  , type:"text" ,reflect : "phoneNumber"},
			{ name : "计划还款日期"  , type:"text" ,reflect : "planRepaymentDate" , filter : function(val){
				return dataFormat(val['planRepaymentDate']) ;
			}},
			{ name : "产品名称"  , type:"text" ,reflect : "productName"},
			{ name : "申请人"  , type:"text" ,reflect : "proposerName"},
			{ name : "审批金额"  , type:"text" ,reflect : "ratifyAmount"},
			{ name : "实际还款日"  , type:"text" ,reflect : "realRepaymentDate" , filter : function(val){
				return dataFormat(val['realRepaymentDate']) ;
			}},
			{ name : "还款状态"  , type:"text" ,reflect : "repayStatus" , filter : function(val){
				let map = {
					"0" : "未还" ,
					"1" : "逾期未还" ,
					"2" : "预期已还" ,
					"3" : "已还"
				};
				let value = map[val['repayStatus']] ;
				return value ? value : "" ;
			}},
		] ,
		data : [] ,
	};

	getData(){
		this.loanSer.sueList(this.searchModel)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data']; 
						this.totalSize = res['page']?res['page']['totalNumber']:0 ;
					}else{
						this.msg.error("获取数据出错,原因" + res['msg']);
					}
				}
			)
	};

	reset(){
		this.searchModel = new SearchModel() ;
		this.getData() ;
	}
	search(){
		this.getData() ;
	};

	orderInfo : object ;
	delMark : boolean = false ;
	editMark : boolean = false ;
	sueMark : boolean ;
	delOrder(){
		let id = this.orderInfo['id'] ;

		let state ;
		if(this.sueMark){
			state = 2 ;
		}else{
			state = 3 ;
		};
		this.loanSer.makeSue(id , state)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功") ;
						this.getData() ;
					}else{
						this.msg.error("操作成功,原因:" + res['msg']) ;
					};
					this.delMark = false ;
				}
			)
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

	exportExcel(){
		let obj = this.searchModel ;
		let url = this.loanSer.sueExcel(obj)
		window.open(url) ;
	};
	infoBoxShow : boolean = false ; 
	importSingle(){
		this.infoBoxShow = true ;
		this.submitForm.reset() ;
		this.editMark = false ;
	};
	fileChange($event){
		let file = $event.target.files[0] ;
		let fileName = file.name.split(".") ;
		let fileFomat = fileName[fileName.length -1 ] ;
		if(!/xls|xlsx/g.test(fileName)){
			this.msg.notifyWarn("上传失败","文件格式仅支持xls或者xlsx") ;
			return ;
		};

		this.loanSer.uploadExcel(file)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("上传成功");
						this.getData() ;
					}else{
						this.msg.error("上传失败,原因:"+ res['msg']) ;
					}
				}
			)
	};

	proList : object[] ;
	getProList(){
		this.proSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						let _arr = [] ;
						res['data'].forEach(element => {
							let _obj = {
								value : element.productName ,
								id : element.id 
							}
							_arr.push(_obj)	
						});
						this.proList = _arr ;
					}else{
						this.msg.error("获取产品信息出错") ;
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
						this.msg.error("获取部门信息出错,原因:" + res['msg']) ;
					}
				}
			)
	};
	makeNew(){
		let val = this.submitForm.value ;
		this.loanSer.addRecord(val)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("导入成功") ;
						this.getData() ;
						this.infoBoxShow = false ;
					}else{
						this.msg.error("导入失败,原因:"+ res['msg']) ;
					}
				}
			)
	};
	editForm(item : object){
		this.submitForm.patchValue(item) ;
		this.infoBoxShow = true ;
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
import { Component ,OnInit } from '@angular/core' ;
import { FinancialService } from '../../service/financial/financial.service';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service';
import { Router } from '@angular/router' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { SearchModel } from './search.model';
import { WorkbenchAll } from '../../service/workbench/all.service'
let __this ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './loan.component.html' ,
	styleUrls : ['./loan.component.less']
})
export class LoanComponent implements OnInit{
	constructor(
		private allSer : WorkbenchAll ,
		private msg : MsgService ,
		private fb : FormBuilder ,
		private emit : EmitService,
		private router : Router ,
		private sgo : SessionStorageService
	){};
	ngOnInit(){
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "个人中心" ,
			url : "/permission/personal"
		});

		this.getData() ;
		__this = this ;
	} ;
	searchModel : SearchModel = new SearchModel() ;
	totalSize : number ;
		tableData : Object = {
		showIndex : false,
		tableTitle : [
			{ name : "订单编号"  , type:"text" ,reflect : "orderNo"},
			{ name : "申请人"  , type:"text" ,reflect : "userName"},
			{ name : "身份证"  , type:"text" ,reflect : "idCard"},
			{ name : "手机号"  , type:"text" ,reflect : "phoneNumber"},
			{ name : "进件时间"  , type:"text" ,reflect : "createTime" , filter : function(val){
				return dataFormat(val['createTime'])
			}},
			{ name : "网点"  , type:"text" ,reflect : "departmentName"},
			{ name : "产品名称"  , type:"text" ,reflect : "productName"},
			{ name : "申请金额"  , type:"text" ,reflect : "applyMoney"},
			{ name : "审批金额"  , type:"text" ,reflect : "agreeMoney"},
			{ name : "客户经理"  , type:"text" ,reflect : "createUserName"}
		] ,
		data : []
	};

	getData(){
		this.allSer.getOrderList(this.searchModel , 14)
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
};
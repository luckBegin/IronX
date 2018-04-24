import { Component ,OnInit } from '@angular/core' ;
import { FinancialService } from '../../service/financial/financial.service';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service';
import { Router } from '@angular/router' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { SearchModel } from './search.model';
let __this ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './get.component.html' ,
	styleUrls : ['./get.component.less']
})
export class GetComponent implements OnInit{
	constructor(
		private finSer : FinancialService ,
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
		data : []
	};

	getData(){
		this.finSer.getLoanList(this.searchModel)
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
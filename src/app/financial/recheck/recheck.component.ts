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
declare var $ : any ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './recheck.component.html' ,
	styleUrls : ['./recheck.component.less']
})
export class RecheckComponent implements OnInit{
	constructor(
		private finSer : FinancialService ,
		private msg : MsgService ,
		private fb : FormBuilder ,
		private emit : EmitService,
		private router : Router ,
		private sgo : SessionStorageService
	){};
	verifyFrorm : FormGroup ;
	ngOnInit(){
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "个人中心" ,
			url : "/permission/personal"
		});

		this.getData() ;
		this.verifyFrorm = this.fb.group({
			realRepaymentDate : [null , [Validators.required]]
		})
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
			{ name : "当月应还"  , type:"text" ,reflect : "currentBalance"},
			{ name : "当月期数"  , type:"text" ,reflect : "totalPeriods"},
			{ name : "是否逾期"  , type:"text" ,reflect : "hasDue" , filter:function(data){
				 if (data.hasDue == 1) {
				    return '是';
				} else if (data.hasDue == 0) {
				    return '否';
				} else {
				    return '';
				}
			}},
			{ name : "逾期天数"  , type:"text" ,reflect : "dueDay"},
			{ name : "进件时间"  , type:"text" ,reflect : "enterDate" , filter: function(val){
				return dataFormat(val['enterDate'])
			}},
			{ name : "身份证"  , type:"text" ,reflect : "idNumber"},
			{ name : "罚息"  , type:"text" ,reflect : "interestPenalty"},
			{ name : "放款日期"  , type:"text" ,reflect : "loanDate", filter: function(val){
				return dataFormat(val['loanDate'])
			}},
			{ name : "滞纳金"  , type:"text" ,reflect : "overdueFine"},
			{ name : "手机号"  , type:"text" ,reflect : "phoneNumber"},
			{ name : "计划还款日期"  , type:"text" ,reflect : "planRepaymentDate" ,filter: function(val){
				return dataFormat(val['planRepaymentDate'])
			}},
			{ name : "产品名称"  , type:"text" ,reflect : "productName"},
			{ name : "申请人"  , type:"text" ,reflect : "proposerName"},
			{ name : "起诉状态"  , type:"text" ,reflect : "prosecuteStatus" , filter : function(data){
				let map = {
					"0" : "待发起",
					"1" : "待确认/移交",
					"2" : "已移交",
					"3" : "已确认"
				};
				let val = map[data.prosecuteStatus]?map[data.prosecuteStatus]:"" ;
				return val  ;
			}},
			{ name : "审批金额"  , type:"text" ,reflect : "ratifyAmount"},
			{ name : "还款状态"  , type:"text" ,reflect : "repayStatus" , filter : function(data){
				if (data.repayStatus == 0) {
					return '未还';
				} else if (data.repayStatus == 1) {
					return '逾期未还';
				} else if (data.repayStatus == 2) {
				return '逾期已还';
				} else if (data.repayStatus == 3) {
					return '已还';
				} else {
					return '';
				};
			}},
		] ,
		data : [],
		btnGroup : {
			title : "操作" ,
			data : [
				{
					textColor : "#80accf",
					name : "确认到款",
					ico : "anticon anticon-edit" ,
					bindFn : function(item){
						// $("#realRepaymentDate").flatpickr();
						__this.orderInfo = item ;
						__this.boxShow = true ;
						__this.verifyFrorm.reset() ;
					}
				}
			]
		}
	};

	getData(){
		this.finSer.getRecheckList(this.searchModel)
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
	boxShow : boolean = false ;
	makeSure(){
		let obj = this.verifyFrorm.value;
		let id = this.orderInfo['id'] ;
		this.finSer.verify(id , obj['realRepaymentDate'])
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.error("操作成功") ;
					}else{
						this.msg.error("操作失败,原因" + res['msg']) ;
					}
					this.boxShow = false ;
					this.getData() ;
				}
			)
	}
};
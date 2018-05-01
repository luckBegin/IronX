import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../../service/storage/session_storage' ;
import { Router , ActivatedRoute} from '@angular/router' ;
import { MsgService } from '../../../service/msg/msg.service' ;
import { OrderSevice } from '../../../service/order/order.service';
import { ProductService } from '../../../service/product/product.service'
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { dataFormat } from '../../../format/dateFormat';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ToolService } from '../../../service/tool/tool.service' ;
declare var $: any; 
let __this  ;
@Component({
	selector : "" ,
	templateUrl : './finalCheck.component.html' ,
	styleUrls : ['./finalCheck.component.less']
})
export class FinalCheckComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private msg : MsgService ,
		private orderSer : OrderSevice ,
		private fb : FormBuilder ,
		private routerInfo : ActivatedRoute ,
		private proSer : ProductService ,
		private toolSer : ToolService
	){};

	checkInfo : object ;
	ngOnInit(){
		__this = this ;

		this.orderId = this.routerInfo.snapshot.params['id'] ; 

		this.getFirstCheckResult() ;
		this.getSecondRst() ;
		this.getProLst() ;
		
		this.thirdForm = this.fb.group({
			"agreeMoney": [null , [Validators.required]],
			"annualInterestRate": [null,[Validators.required]],
			"deadLine":  [null,[Validators.required]],
			"description":  [null,[Validators.required]],
			"orderId": [this.orderId,[Validators.required]],
			"productId": [null,[Validators.required]],
			"status":  [null,[Validators.required]],
		});

		this.orderInfo = this.sgo.get("checkInfo") ;
		this.thirdForm.patchValue({
			productId : this.orderInfo['productId'],
			deadLine : this.orderInfo['deadline'],
			annualInterestRate : this.orderInfo['annualInterestRate'] * 100
		});
	};


	orderId : number ;
	result : object ; 
	orderInfo : object ;
	thirdForm : FormGroup ;
	getFirstCheckResult(){
		let id = this.orderId ;
		this.orderSer.getFirstCheckResult(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.result = res['data'] ;
					}else{
						this.msg.error("获取初审结果出错,原因" + res['msg']) ;
					}
				}
			)
	}
	secondResult : object ; 
	getSecondRst(){
		let id = this.orderId ;
		this.orderSer.getSecondCheckResult(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.secondResult = res['data'] ;
						this.thirdForm.patchValue({
							"agreeMoney" : res['data']['mockMoney']
						})
						this.getCalc() ;
					}else{
						this.msg.error("获取复审结果出错,原因:" + res['msg']) ;
					};
				}
			)
	};
	proList : object[] ;
	getProLst(){
		this.proSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.proList = res['data'] ;
					}else{
						this.msg.error("获取产品列表出错,原因:" + res['msg']) ;
					};
				}
			)
	};
	submit(){
		let postData = this.thirdForm.value ;
		// console.log(postData) ;
		this.orderSer.saveLastCheck(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.router.navigate(['/workbench/approve/third']) ;
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	};
	tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "期数"  , type:"text" ,reflect : "period"},
			{ name : "本期应还(元)"  , type:"text" ,reflect : "totalAmount"},
			{ name : "应还本金(元)"  , type:"text" ,reflect : "principal"},
			{ name : "应还利息(元)"  , type:"text" ,reflect : "totalAmount"}
		] ,
		data : [],
	};
	getCalc(){
		let mockMoney = this.thirdForm.value['agreeMoney'];
		let productId = this.thirdForm.value['productId'];
		let deadline = this.thirdForm.value['deadLine'];
		let id = this.orderId;
		let obj = {
			"borrowAmount" :mockMoney,
			"productId"  : productId ,
			"loanDeadline" :deadline,
		} ;
		this.toolSer.getCalc(obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data']['repayPlans'];
 					}else{
						this.msg.error("获取还款计划,原因:" + res['msg']) ;
					};
				}
			)
	}

	choseChange($event){
		this.proList.forEach( item => {
			if(item['id'] == $event){
				this.thirdForm.patchValue({
					"annualInterestRate" :  item['annualInterestRate'] ,
					"deadLine"  : item['loanDeadline']
				});
			};
		})
		this.getCalc() ;
	}
};
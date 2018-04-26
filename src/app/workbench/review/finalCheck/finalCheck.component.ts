import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../../service/storage/session_storage' ;
import { Router , ActivatedRoute} from '@angular/router' ;
import { MsgService } from '../../../service/msg/msg.service' ;
import { OrderSevice } from '../../../service/order/order.service';
import { ProductService } from '../../../service/product/product.service'
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { dataFormat } from '../../../format/dateFormat';
import { ValueTransformer } from '@angular/compiler/src/util';
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
			"repayMonth": [null,[Validators.required]],
			"status":  [null,[Validators.required]],
		});
	};

	orderId : number ;
	result : object ; 
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
	validateForm : FormGroup ;
	secondResult : object ; 
	getSecondRst(){
		let id = this.orderId ;
		this.orderSer.getSecondCheckResult(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.secondResult = res['data'] ;
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

	}
};
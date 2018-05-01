import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { Router , ActivatedRoute} from '@angular/router' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { OrderSevice } from '../../service/order/order.service';
import { ProductService } from '../../service/product/product.service'
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { dataFormat } from '../../format/dateFormat';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ImgService} from '../../service/img/img.service';
import { ToolService } from '../../service/tool/tool.service'
import { validateConfig } from '@angular/router/src/config';
declare var $: any; 
let __this  ;
@Component({
	selector : "" ,
	templateUrl : './makeLoan.component.html' ,
	styleUrls : ['./makeLoan.component.less']
})
export class MakeLoanComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private msg : MsgService ,
		private orderSer : OrderSevice ,
		private fb : FormBuilder ,
		private routerInfo : ActivatedRoute ,
		private proSer : ProductService ,
		private imgSer :ImgService ,
		private toolSer : ToolService
	){};

	checkInfo : object ;
	ngOnInit(){
		__this = this ;
		
		this.orderId = this.routerInfo.snapshot.params['id'] ; 
		this.orderInfo = this.sgo.get("checkInfo") ;

		this.thirdForm = this.fb.group({
			"loanDate" : [null , [Validators.required]] ,
			"orderId" : [this.orderInfo['id'] , [Validators.required]]
		});

		this.getCalc() ;
	};

	orderId : number ;
	orderInfo : object ;
	thirdForm : FormGroup ;
	submit(){
		let value = this.thirdForm.value ;

		if(!this.thirdForm.valid){
			this.msg.warn("请填写日期") ;
			return ; 
		};
		this.orderSer.makeLoan(value , this.orderId)
		.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
						this.router.navigate(['/workbench/sure']) ;
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					}
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
		let id = this.orderId;
		let obj = {
			"borrowAmount" :this.orderInfo['agreeMoney'],
			"productId"  : this.orderInfo['productId'] ,
			"loanDeadline" :this.orderInfo['deadline'] ,
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
};
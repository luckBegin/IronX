import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../../service/storage/session_storage' ;
import { Router , ActivatedRoute} from '@angular/router' ;
import { WorkbenchAll } from '../../../service/workbench/all.service' ;
import { MsgService } from '../../../service/msg/msg.service' ;
import { OrderSevice } from '../../../service/order/order.service';
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { ImgService } from '../../../service/img/img.service'
import { dataFormat } from '../../../format/dateFormat';
import { ValueTransformer } from '@angular/compiler/src/util';
declare var $: any; 
let __this  ;
@Component({
	selector : "" ,
	templateUrl : './reApprove.component.html' ,
	styleUrls : ['./reApprove.component.less']
})
export class ReApproveComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private workSer : WorkbenchAll ,
		private msg : MsgService ,
		private orderSer : OrderSevice ,
		private fb : FormBuilder ,
		private imgSer : ImgService ,
		private routerInfo : ActivatedRoute
	){};

	checkInfo : object ;
	ngOnInit(){
		__this = this ;
		this.orderId = this.routerInfo.snapshot.params['id'] ; 
		this.getFirstCheckResult() ;
		this.secondForm = this.fb.group({
			"description" : [null , [Validators.required]] ,
			"mockMoney" : [null] ,
			"orderId" : [this.orderId , [Validators.required]] ,
			"status" : [1 , [Validators.required]] ,
		});
		this.validateForm = this.fb.group({
			"rejectionReason" : [null , [Validators.required]] ,
			"opinion" : [ null ]
		}) ;
	};

	orderId : number ;
	result : object ; 
	secondForm : FormGroup ;
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
	refuseModel : boolean = false ;
	refuse(){
		let id = this.checkInfo['id'] ;
		let obj = this.validateForm.value ; 
		obj['orderId'] = id ;
		this.workSer.refuse(obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.refuseModel = false ;
						this.msg.notifySuccess("操作成功" , '该订单已拒绝');
						this.router.navigate(['/workbench/approve/first']) ;
					}else{
						this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
					};
				}
			)
	};
	showRefuse(){
		this.refuseModel = true ;
	};
	pass(){
		if(!this.secondForm.valid){
			this.msg.warn("请填写每项信息") ;
			return ;
		}
		let obj = this.secondForm.value;
		this.orderSer.saveSecondCheck(obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功") ;
						this.router.navigate(['/workbench/approve/second']) ;
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					};
				}
			)
	}
};
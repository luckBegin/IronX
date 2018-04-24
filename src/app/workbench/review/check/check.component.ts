import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../../service/storage/session_storage' ;
import { Router } from '@angular/router' ;
import { WorkbenchAll } from '../../../service/workbench/all.service' ;
import { MsgService } from '../../../service/msg/msg.service' ;
import { OrderSevice } from '../../../service/order/order.service';
declare var $: any; 
@Component({
	selector : "" ,
	templateUrl : './check.component.html' ,
	styleUrls : ['./check.component.less']
})
export class CheckComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private workSer : WorkbenchAll ,
		private msg : MsgService ,
		private orderSer : OrderSevice
	){};

	ngOnInit(){
		this.checkInfo = this.sgo.get("checkInfo") ;
		this.getOrderInfo() ;
		this.getImgs() ;
		this.getDealRecord() ;
	};

	checkInfo : object  ;
	orderInfo : object ;
	getOrderInfo(){
		let id = this.checkInfo['id'] ;
		this.workSer.getOderInfo(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.orderInfo = res['data'] ;
						// this.orderInfo = res['data'];
					}else{
						this.msg.error("获取订单信息失败"+res['message']) ;
					};
				}
			);
	};

	imgList : object[] ;
	getImgs(){
		let id = this.checkInfo['id'] ;
		this.orderSer.getImg(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						let _arr = []
						for(let keys in res['data']){
							let _obj = {
								title : keys ,
								imgs : res['data'][keys]
							};

							_arr.push(_obj) ;
						};
						this.imgList = _arr ;
						// this.orderInfo = res['data'];
					}else{
						this.msg.error("获取资料信息失败"+res['message']) ;
					};
				}
			)
	};
	makeLook(idx){
		$(`.showImg:eq(${idx})`).viewer({
			inline: false,
			viewed: function() {
				$(`.showImg:eq(${idx})`).viewer('zoomTo', 1);
			}
		});
	};

	dealRecord : object[] ;
	getDealRecord(){
		let id = this.checkInfo['id'] ;
		this.orderSer.getDealRecord(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.dealRecord = res['data'] ;
					}else{
						this.msg.error("获取处理记录出错,原因:" + res['msg']) ;
					}
				}
			)
	}
};
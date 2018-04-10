import { Component , OnInit } from '@angular/core' ;
import { EmitService } from '../../service/event-emit.service' ;
import { ProductService } from '../../service/product/product.service' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { WorkbenchAll } from '../../service/workbench/all.service' ;
import { Router , ActivatedRoute } from '@angular/router' ;
import { AbstractControl,FormBuilder,FormControl,FormGroup,Validators , } from '@angular/forms';
import { EnumService } from '../../service/enum/enum.service' ;
import { DateReflect } from '../../service/date-reflect' ;
@Component({
	selector : "app-dataRemake" ,
	templateUrl : './dataRemake.component.html' ,
	styleUrls: ['./dataRemake.component.less']
})
export class DataRemakeComponent implements OnInit{
	constructor(
		private emit : EmitService ,
		private proSer : ProductService ,
		private msg : MsgService,
		private workSer : WorkbenchAll,
		private router : Router,
		private routerInfo : ActivatedRoute,
		private fb: FormBuilder ,
		private enumSer : EnumService 
	){};

	ngOnInit(){
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "资料补录" ,
			url : "/workbench/dataRemakeList"
		});

		this.orderId = this.routerInfo.snapshot.params['id'] ;
		this.getOrderInfo() ;
		this.getProList() ;
		this.getSex() ;
		this.getMarry() ;
		this.getEdu() ;
		this.getUnit() ;
		// this.getLive() ;
	};

	current : number =  0 ;

	cancelModel : boolean = false ;
	orderId : number ;
	usrCancel(item) : void{
		this.cancelModel = true ;
	};

	cancel(){
		this.workSer.cancel(this.orderId)
			.subscribe(
				res => {
					if(res['success'] == true){
						window.history.back();
						this.msg.notifySuccess("操作成功","已取消该客户订单") ;
					}else{
						this.msg.error("操作失败,原因"+res['message']) ;
					};
				}
			)
	};

	nextStep() : void{
		if(!this.selectData['proInfo'] && this.current == 0){
			this.msg.warn("请先选择产品");
			return ;
		};
		this.current += 1 ;
	};

	proListData : object[] ;

	proList_active : number = 0 ;

	getProList(){
		this.proSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.proListData = res['data'] ;
					}else{
						this.msg.error("获取产品列表数据失败");
					};
				}
			)
	};

	selectData = {} ;

	selectPro(item : object , idx){
		this.proList_active = idx ;
		this.selectData['proInfo'] = item ;
	};

	orderInfo : object ;
	getOrderInfo(){
		this.workSer.getOderInfo(this.orderId)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.orderInfo = res['data'];
					}else{
						this.msg.error("获取订单信息失败"+res['message']) ;
					};
				}
			)
	};

	switchTab($el){
		let className = $el.target.className ;
		let parentWrap = $el.target.parentElement.parentElement ;
		let content = parentWrap.querySelector(".c-fold-content") ;
		if(className == 'anticon anticon-up-square-o c-arrow-ico'){
			content.className += ' c-fold-content-fold' ;
			$el.target.className = 'anticon anticon-down-square-o c-arrow-ico';
		}else{
			content.className = 'c-fold-content' ;
			$el.target.className = 'anticon anticon-up-square-o c-arrow-ico';
		};
	};

	enum_SexModel : object[] = [] ;
	getSex(){
		this.enumSer.getSex()
			.subscribe(
				res => {
					if(res['success'] == true){
						if(res['data']){
							this.enum_SexModel = makeObjToArr(res['data']) ;
							// for(let keys in res['data']){
							// 	let obj = {
							// 		name : res['data'][keys] ,
							// 		id : keys 
							// 	}
							// 	this.enum_SexModel.push(obj);
							// };
						}
						// this.enum_SexModel = DateReflect(map , res['data']) ;
					}else{
						this.msg.error("获取性别数据出错,原因:"+res['message']) ;
					};
				}
			)
	};

	enum_marryModel : object[] = [] ;
	getMarry(){
		this.enumSer.getMarry()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.enum_marryModel = makeObjToArr(res['data']) ;
					}else{
						this.msg.error("获取婚姻状况信息出错,原因:" + res['message']) ;
					};
				}
			)
	};

	enum_edu : object[] = [];
	getEdu(){
		this.enumSer.getEdu()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.enum_edu = makeObjToArr(res['data']) ;
					}else{
						this.msg.error("获取教育程度信息出错,原因:" + res['message']) ;
					}
				}
			)
	};

	enum_unit : object[] = [] ;
	getUnit(){
		this.enumSer.getEdu()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.enum_unit = makeObjToArr(res['data']) ;
					}else{
						this.msg.error("获取单位性质出错,原因:" + res['message']) ;
					}
				}
			)
	}
	// enum_live : object[] = [] ;
	// getLive(){
	// 	this.enumSer.getLive()
	// 		.subscribe(
	// 			res => {

	// 				debugger ;
	// 				if(res['success'] == true){
	// 					console.log(res['data']) ;
	// 					this.enum_live = makeObjToArr(res['data']) ;
	// 				}else{
	// 					this.msg.error("获取居住信息出错,原因:" + res['message']) ;
	// 				}
	// 			}
	// 		)
	// };
};

let makeObjToArr = function(obj){
	var _arr = [] ;
	for(let keys in obj){
		let _obj = {
			name : obj[keys] ,
			id : keys
		};

		_arr.push(_obj);
	};

	return _arr ;
};
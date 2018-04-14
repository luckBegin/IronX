import { Component , OnInit } from '@angular/core' ;
import { EmitService } from '../../service/event-emit.service' ;
import { ProductService } from '../../service/product/product.service' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { WorkbenchAll } from '../../service/workbench/all.service' ;
import { Router , ActivatedRoute } from '@angular/router' ;
import { AbstractControl,FormBuilder,FormControl,FormGroup,Validators , } from '@angular/forms';
import { EnumService } from '../../service/enum/enum.service' ;
import { DateReflect } from '../../service/date-reflect' ;
import { ImgService } from '../../service/img/img.service';
import { PostDataModel } from './postData.model';
import { CityService } from '../../service/city/city.service' ;
import { LocalStorageService } from '../../service/storage/local_storage';
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
		private enumSer : EnumService,
		private imgSer : ImgService,
		private citySer : CityService,
		private lgo : LocalStorageService
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
		this.getLoanUse() ;
		this.getLoanType() ;
		this.getImgUploadType() ;

		this.postModel.applyOrderVO['id'] = this.orderId;

		this.enum_province = this.citySer.getCityList() ;
		// this.getRepayWay();
		// this.getLive() ;
	};

	enum_province : object[] = [] ;

	enum_city : object[] = [] ;

	enum_area : object[] = [];

	postModel : PostDataModel = new PostDataModel () ;
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
			);
	};

	nextStep() : void{
		if(!this.selectData['proInfo'] && this.current == 0){
			this.msg.warn("请先选择产品");
			return ;
		};
		!this.postModel.applyOrderVO && (this.postModel.applyOrderVO = {}) ;
		this.postModel.applyOrderVO['productId'] = this.proListData[this.proList_active]['id']
		this.current += 1 ;
	};

	proListData : object[] ;

	proList_active : number ;

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
			);
	};

	selectData = {} ;

	selectPro(item : object , idx){
		this.proList_active = idx ;
		this.selectData['proInfo'] = item ;
	};

	getOrderInfo(){
		this.workSer.getOderInfo(this.orderId)
			.subscribe(
				res => {
					if(res['success'] == true){
						// this.postModel = res['data'] ;
						// this.orderInfo = res['data'];
					}else{
						this.msg.error("获取订单信息失败"+res['message']) ;
					};
				}
			);
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
						if(res['data'])
							this.enum_SexModel = makeObjToArr(res['data']) ;
					}else{
						this.msg.error("获取性别数据出错,原因:"+res['message']) ;
					}
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
		this.enumSer.getUnit()
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

	// enum_repayWay : object [] = [] ;
	// getRepayWay(){
	// 	this.enumSer.getRepayWay()
	// 		.subscribe(
	// 			res => {
	// 				if(res['success'] == true){
	// 					this.enum_repayWay = makeObjToArr(res['data']) ;
	// 				}else{
	// 					this.msg.error("获取还款方式出错,原因:" + res['message']) ;
	// 				};
	// 			}
	// 		)
	// };

	enum_loanUse : object[] = [] ;
	getLoanUse(){
		this.enumSer.getLoanPurpose()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.enum_loanUse = makeObjToArr(res['data']) ;
					}else{
						this.msg.error("获取贷款用途出错,原因:" + res['message']) ;
					};
				}
			)
	};
	
	enum_loanType : object[] = [] ;
	getLoanType(){
		this.enumSer.getLoanType()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.enum_loanType = makeObjToArr(res['data']) ;
					}else{
						this.msg.error("获取种类信息出错,原因:" + res['message']) ;
					};
				}
			);
	};

	imgUploadType : object[] = [] ;
	getImgUploadType(){
		this.enumSer.getImgUoloadType()
			.subscribe(
				res => {
					if(res['success'] == true){
						let map = {
							desc : "name" ,
							code : "id" 
						};
						this.imgUploadType = DateReflect(map , res['data']) ;
						this.imgSelect = this.imgUploadType[0]['id'] +","+ this.imgUploadType[0]['name'];
					}else{
						this.msg.error("获取图片上传种类信息失败,原因:"+res['message']) ;
					};
				}
			)
	};

	imgSelect ;
	imgUploads : object[] = [] ;
	imgUpload($event){
		let profileInfo = this.imgSelect.split(",") ;
		let tar = $event.target.files[0];

		if(!tar){
			return ;
		};
		let fileName = tar.name.split(".");

		let isImg = this.imgSer.isImg(fileName[fileName.length -1 ]) ;
		let size = Math.ceil(tar.size / 1024);


		// if(!isImg){
		// 	this.msg.notifyErr("图片格式错误" , "支持上传的图片格式仅为png , jpg , jpeg");
		// 	return ;
		// };
		if(size > 1024){
			this.msg.notifyErr("图片大小错误",'支持上传的图片大小不能超过1M');
			return ;
		}
		let _info = null ;
		this.imgUploads.forEach( item => {
			if(item['title'] == profileInfo[1]){
				_info = item ;
			};
		});

		if(_info){
			_info['imgs'].push({}) ;
		}else{
			_info = {
				title : profileInfo[1],
				id : profileInfo[0] ,
				imgs : [
					{}
				]
			};
			this.imgUploads.push(_info) ;
		};
		let formData = new FormData();
			formData.set("sourceType" , profileInfo[0]);
			formData.set("orderId" , this.orderId +"");
			formData.set("files" , tar);

		this.imgSer.imgUpload(formData)
			.subscribe(
				res => {
					if(res['success'] == true){
						_info['imgs'][_info['imgs'].length -1]['url'] = res['data'][0]['url'];
						_info['imgs'][_info['imgs'].length -1]['id'] = res['data'][0]['id'];
						_info['imgs'][_info['imgs'].length -1]['size'] = size ;
						_info['imgs'][_info['imgs'].length -1]['name'] = tar.name ;
					};
				}
			);
	};

	imgModal : boolean = false ;
	lookImg : object = {} ;
	makeLook( idx : string , index : string){
		this.imgModal = true ;

		let imgUrl = this.imgUploads[idx]['imgs'][index]['url'];
		let id = this.imgUploads[idx]['imgs'][index]['id'];

		this.lookImg = {
			url : imgUrl , 
			firstIndex : idx ,
			secIndex : index ,
			id : id
		};
	};

	delImg(idx,idx2){
		let len = this.imgUploads[idx]['imgs'].length ;
		let id = this.imgUploads[idx]['imgs'][idx2]['id'];

		this.imgSer.delImg(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("图片删除成功");
						if(len == 1){
							this.imgUploads.splice( idx, 1)
						}else{
							this.imgUploads[idx]['imgs'].splice(idx2 , 1 ) ;
						};
					}else{
						this.msg.error("图片删除失败") ;
					}
				}
			)
	};

	delImgBtn(){
		let idx = this.lookImg['firstIndex'];
		let idx2 = this.lookImg['secIndex'];
		this.delImg(idx ,idx2);
		this.imgModal = false ;
	};
	
	delItem(idx){
		this.imgUploads.splice( idx , 1 ) ;
	};

	priveChange(parent,item,model){
		let val = this.postModel.clientInfoInputVO[model] ;
		if(val){
			let id = val.split(",")[1] ;
			this[item] = this[parent][id]['child'] ;

			let province = this.postModel.clientInfoInputVO['registerProvince'];
			let proName = province?province.split(",")[0]:"" ;

			let city = this.postModel.clientInfoInputVO['registerCity'];
			let cityName = city?city.split(",")[0]:"" ;

			let county = this.postModel.clientInfoInputVO['registerCounty'] ;
			let countName = county?county.split(",")[0]:"" ;

			this.postModel.clientInfoInputVO['registerDetailAddress'] = proName + cityName + countName ;
		};
	};

	submitCheck(){
		this.postModel.clientInfoInputVO['userId'] = 1 ;
		let orderInfo = this.lgo.get("proInfo") ;
		console.log(orderInfo);
	};
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
let UpdateObj = function( target : object , expect : object){
	for(let keys in expect){
		target[keys] = expect[keys] ;
	};
};
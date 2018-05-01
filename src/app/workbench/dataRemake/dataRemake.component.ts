import { Component , OnInit } from '@angular/core' ;
import { EmitService } from '../../service/event-emit.service' ;
import { ProductService } from '../../service/product/product.service' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { WorkbenchAll } from '../../service/workbench/all.service' ;
import { Router , ActivatedRoute } from '@angular/router' ;
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { EnumService } from '../../service/enum/enum.service' ;
import { DateReflect } from '../../service/date-reflect' ;
import { ImgService } from '../../service/img/img.service';
import { PostDataModel } from './postData.model';
import { CityService } from '../../service/city/city.service' ;
import { SessionStorageService } from '../../service/storage/session_storage';
import { CommonValidator } from '../../validator/common.validator';
import { OrderSevice } from '../../service/order/order.service'
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
		private lgo : SessionStorageService ,
		private orderSer : OrderSevice
	){};

	ngOnInit(){
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "资料补录" ,
			url : "/workbench/dataRemakeList"
		});

		this.initForm() ;
		this.orderId = this.routerInfo.snapshot.params['id'] ;
		this.getOrderInfo() ;
		this.getProList() ;
		// this.getSex() ;
		// this.getMarry() ;
		// this.getEdu() ;
		this.getUnit() ;
		// this.getLoanUse() ;
		// this.getLoanType() ;
		this.getImgUploadType() ;
		this.getImg() ;
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

	validForm : FormGroup ;
	initForm(){
		this.validForm = this.fb.group({
			"clientInfoInputVO" : this.fb.group({
				"userName" : [null , [Validators.required,CommonValidator.isChinese]] ,
				"gender" : [null , [Validators.required,CommonValidator.isNumber]] ,
				"marriageState" : [null , [Validators.required,CommonValidator.isNumber]] ,
				"birthDate" : [null ,[Validators.required]] ,	
				"educationDegree" : [null , [Validators.required,CommonValidator.isNumber]] ,
				"idCard" : [null , [Validators.required,CommonValidator.isIdCard]] ,
				"monthlyIncome" : [null , [Validators.required , CommonValidator.passiveNumber]],
				"localHouse" : [null , [Validators.required , CommonValidator.isNumber]],
				"phoneNumber" : [null , [Validators.required , CommonValidator.isNumber , Validators.min(11) , Validators.max(11)]],
				"dwellDetail" : [null , [Validators.required]],
				"dwellState" : [null , [Validators.required]],
				"registerProvince" : [null , [Validators.required]],
				"registerCity" : [null],
				"registerCounty" : [null],
				"registerDetailAddress" : [null , [Validators.required]],
				"currentAddress" : [null , [Validators.required]],
			}),
			"clientUnitInputVO" : this.fb.group({
				"unitName" : [null , [Validators.required]] ,
				"department" : [null ,[Validators.required]] ,
				"unitNature" : [null ,[Validators.required]] ,
				"jobType" : [null ,[Validators.required]] ,
				"jobPosition" : [null ,[Validators.required]] ,
				"currentUnitEntryDate" : [null ,[Validators.required]] ,
				"currentUnitWorkYears" : [null ,[Validators.required]] ,
				"unitPhone" : [null ,[Validators.required]] ,
				"salaryGrantForm" : [null ,[Validators.required]] ,
				"currentUnitAddress" : [null ,[Validators.required]] ,
			}),
			"clientContactInputVOS" : this.fb.array([ this.createContact() ]) ,
			"applyOrderVO" : this.fb.group({
				"applyMoney" : [null , [Validators.required]],
				"deadline" : [null , [Validators.required]],
				"payBackType" : [null , [Validators.required]],
				"use" : [null , [Validators.required]],
				"useNature" : [null , [Validators.required]],
			})
		});
		this.add() ;
	}
	createContact(){
		let id = this.lgo.get("proInfo")['customerId'] ;
		return this.fb.group({
			contactName: [null , [Validators.required]] ,
			contactPhone: [null , [Validators.required]] ,
			contactRelation: [null , [Validators.required]] ,
			contactType: [null ] ,
			id: [null] ,
			userId: [null] ,
			workAddress: [null , [Validators.required]] ,
			workUnit: [null , [Validators.required]] ,
		}) ;
	};
	relationChange(idx : number){
		const control = this.validForm.controls['clientContactInputVOS']['controls'][idx] ;
		let val = control['value']['contactRelation'] < 2 ? 0 : 1 ;
 		control.pathValue({
			contactType : val
		})
	}
	add( times : number = 1 ){
		for(let i = 0 ; i < times ; i++ ){
			const control = <FormArray>this.validForm.controls['clientContactInputVOS'];
			control.push(this.createContact());
		};
	};
	removeRelation(idx :number ){
		const control = <FormArray>this.validForm.controls['clientContactInputVOS'];
		control.removeAt(idx) ;
	};
	get clientContactInputVOS() : FormArray{
		return this.validForm.get("clientContactInputVOS") as FormArray ;
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
		this.selectData['proInfo'] = item;
	};

	orderInfo : object  ;
	getOrderInfo(){
		this.workSer.getOderInfo(this.orderId)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.orderInfo = res['data'];						
						this.makeFormVal(res['data']) ;

					}else{
						this.msg.error("获取订单信息失败"+res['message']) ;
					};
				}
			);
	};

	makeFormVal(data : object){
		let orderVO = data['orderVO'] ;
		if(orderVO){
			this.validForm.controls['applyOrderVO'].patchValue(orderVO) ;
		};

		let clientInfoOutputVO = data['clientInfoOutputVO'] ;
		if(clientInfoOutputVO){
			this.validForm.controls['clientInfoInputVO'].patchValue(clientInfoOutputVO) ;
		} ;

		let clientUnitOutputVO = data['clientUnitOutputVO'] ;
		if(clientUnitOutputVO){
			this.validForm.controls['clientUnitInputVO'].patchValue(clientUnitOutputVO) ;
		};


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
	};

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

	imgSelect : string ;
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


		if(!isImg){
			this.msg.notifyErr("图片格式错误" , "支持上传的图片格式仅为png , jpg , jpeg");
			return ;
		};
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

	priveChange($event , parent,item){
		if($event){
			let id = $event.split(",")[1] ;
			this[item] = this[parent][id]['child'] ? this[parent][id]['child'] : [] ;
			// debugger ;
			// let addr = this.validForm.controls['clientInfoInputVO'].value['registerDetailAddress'] ;

			// addr = addr?addr:"" ;
			// addr += $event.split(",")[0] ;
			// this.validForm.controls['clientInfoInputVO'].patchValue({
			// 	"registerDetailAddress" : addr
			// });
		};
	};

	submitCheck(){
		// debugger ;
		// if(!this.validForm.valid){
		// 	this.msg.warn("请检测填写的每一项信息") ;
		// 	return ;
		// }
		let usrId = this.orderInfo['orderVO']['customerId'] ;
		let value = this.validForm.value ;
		value.applyOrderVO['id'] =  this.orderInfo['orderVO']['id'] ;
		value.applyOrderVO['productId']  = this.proListData[this.proList_active]['id']
		value.clientInfoInputVO['id'] = usrId ;
		value.clientUnitInputVO['userId'] = usrId ;
		value.clientInfoInputVO['registerProvince'] = value.clientInfoInputVO['registerProvince'].split(",")[0];
		value.clientInfoInputVO['registerCity'] = value.clientInfoInputVO['registerCity']?value.clientInfoInputVO['registerCity'].split(",")[0] : "" ;
		value.clientInfoInputVO['registerCounty'] = value.clientInfoInputVO['registerCounty']?value.clientInfoInputVO['registerCounty'].split(",")[0] : "" ;
		value['clientContactInputVOS'].forEach( item => {
			item.contactRelation > 2? item.contactType= 0 : item.contactType = 1 ;
		});
		this.workSer.postClientInfo(value)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("提交成功");
						this.router.navigate(['/workbench/profile']);
					}else{
						this.msg.error("提交失败，原因:" + res['msg']) ;
					};
				}
			);
	};

	getImg(){
		this.orderSer.getImg(this.orderId)
			.subscribe(
				res => {
					if(res['success'] == true){
						if(res['data'])
							for(let keys in res['data']){
								let item  = res['data'][keys] ;
								let _info = {
									title :keys ,
									id : 0,
									imgs : []
								};
								item.forEach( item2 => {
									let _arr = {
										url : item2.url ,
										name : item2.fileName,
										imgSize : "未知" ,
										id : item2.id
									};

									_info.imgs.push(_arr) ;
								});

								this.imgUploads.push(_info) ;
							};
					}else{
						this.msg.error("获取图片资源失败，原因:" + res['msg']) ;
					};
				}
			)
	}
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
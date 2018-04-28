import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../../service/storage/session_storage' ;
import { Router } from '@angular/router' ;
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
	templateUrl : './approve.component.html' ,
	styleUrls : ['./approve.component.less']
})
export class ApproveComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private workSer : WorkbenchAll ,
		private msg : MsgService ,
		private orderSer : OrderSevice ,
		private fb : FormBuilder ,
		private imgSer : ImgService
	){};

	checkInfo : object ;
	ngOnInit(){
		this.checkInfo = this.sgo.get("checkInfo") ;
		this.initReportForm() ;
		this.initTelRecordForm() ;
		this.initTelCheckForm() ;
		this.validateForm = this.fb.group({
			"rejectionReason" : [null , [Validators.required]] ,
			"opinion" : [ null ]
		})
		this.makeCheckForm = this.fb.group({
			"description" :  [null , [Validators.required]] ,
			"diligencePurpose" :  [null] ,
			"dueDiligence" : [null] ,
			"mockMoney" : [null] ,
			"orderId": [null] ,
			"status": [null] ,
		});
		this.getTelRecord() ;
		this.getReport() ;
		this.getFirstImg();
		this.getTelResult() ;
		__this = this ;
	};

	reportForm : FormGroup ; 
	telCheckForm : FormGroup ;
	telRecordForm : FormGroup ;
	makeCheckForm : FormGroup ;
	initReportForm(){
		this.reportForm = this.fb.group({
			"hasBankBlacklist" : [null , [ Validators.required ] ] ,
			"hasTradeInto" : [null , [ Validators.required ] ],
			"hasCreditTypeException" : [null , [Validators.required] ] ,
			"lastTimeWorkUnit" : [null , [Validators.required]] ,
			"loanRecord" : [null , [ Validators.required ] ] ,
			"loanTotalCreditAmount" : [null , [Validators.required]] ,
			"loanBalance" : [null , [Validators.required]] ,
			"loanDue" : [null , [Validators.required]] ,
			"loanMOne" : [null ] ,
			"loanMTwo" : [null] ,
			"loanMThree" : [null ] ,
			"loanMSeven" : [null ] ,
			"creditCardUseRecord" : [null , [Validators.required]] ,
			"creditCardTotalCreditAmount" : [null , [Validators.required]] ,
			"creditCardHaveUsedAmount" : [null , Validators] ,
			"creditCardSixMonthAverageAmount" : [ null ] ,
			"creditCardMOne" : [ null ] ,
			"creditCardMTwo" : [ null ] ,
			"creditCardMThree" : [ null ] ,
			"creditCardMSeven" : [ null ] ,
			"threeMonthLoan" : [ null ] ,
			"threeMonthCreditCard" : [ null ] ,
			"threeMonthGuarantee" : [ null ] ,
			"threeMonthGuaranteeBefore" : [ null ] ,
			"threeMonthPersonage" : [ null ] ,
		})
	};
	createRealtionGroup(){
		return this.fb.group({
			"relation" : [null ,[Validators.required]],
			"relationRemark" : [null ,[Validators.required]],
			"age" :  [null ,[Validators.required]],
			"work" : [null ,[Validators.required]],
			"address" : [null ,[Validators.required]],
		})
	};
	createContact(){
		return this.fb.group({
			isKnowLoan : [null ,[Validators.required]],
			name  : [null ,[Validators.required]],
			nameIsReal : [null ,[Validators.required]],
			phoneNumber : [null ,[Validators.required]],
			phoneNumberIsLocal : [null ,[Validators.required]],
			relation  : [null ,[Validators.required]],
			relationIsReal  : [null ,[Validators.required]],
			remark  : [null ,[Validators.required]]
		}) ;
	};
	createInsti(){
		return this.fb.group({
			financialInstitutionName  : [null ,[Validators.required]],
			loanAmount : [null ,[Validators.required]],
			monthlyRepayAmount : [null ,[Validators.required]]
		}) ;
	}
	add( times : number = 1 ){
		for(let i = 0 ; i < times ; i++ ){
			const control = <FormArray>this.telCheckForm.controls['familyMembers'];
			control.push(this.createRealtionGroup());
		};
	};
	removeRelation(idx :number ){
		const control = <FormArray>this.telCheckForm.controls['familyMembers'];
		control.removeAt(idx) ;
	};
	addContact(times : number = 1){
		for(let i = 0 ; i < times ; i++ ){
			const control = <FormArray>this.telCheckForm.controls['contacts'];
			control.push(this.createContact());
		};
	} 
	removeContact(idx :number ){
		const control = <FormArray>this.telCheckForm.controls['contacts'];
		control.removeAt(idx) ;
	};
	addInsti(times : number = 1){
		for(let i = 0 ; i < times ; i++ ){
			const control = <FormArray>this.telCheckForm.controls['financialInstitutions'];
			control.push(this.createInsti());
		};
	}
	removeInsti(idx :number ){
		const control = <FormArray>this.telCheckForm.controls['financialInstitutions'];
		control.removeAt(idx) ;
	};
	get familyMembers() : FormArray {
		return this.telCheckForm.get('familyMembers') as FormArray;
	};
	get contacts() : FormArray{
		return this.telCheckForm.get("contacts") as FormArray ;
	};
	get financialInstitutions() : FormArray{
		return this.telCheckForm.get("financialInstitutions") as FormArray ;
	};
	initTelCheckForm(){
		this.telCheckForm = this.fb.group({
			"name" : [null , [Validators.required]] ,
			"idCard" : [null , [Validators.required]] ,
			"chineseZodiac" : [null , [Validators.required]] ,
			"maritalStatus" : [null , [Validators.required]] ,
			"accountAddress" : [null ,[Validators.required]] ,
			"nowAddress" : [null ,[Validators.required]] ,
			"identityInformationOptions" : [null ,[Validators.required]] ,
			"identityInformationRemark" : [null] ,
			"applyAmount" : [null , [Validators.required]] ,
			"loanPeriod" : [null , [Validators.required]] ,
			"loanUse" : [null , [Validators.required]] ,
			"familyMembers" : this.fb.array( [ this.createRealtionGroup() ] ) ,
			"livingCondition" : [null , [Validators.required]] ,
			"liveYears" : [null , [Validators.required]] ,
			"permanentPopulation" : [null , [Validators.required]] ,
			"buildingArea" : [null , [Validators.required]], 
			"constructionTime" : [null , [Validators.required]] ,
			"decorationCost" : [null , [Validators.required]] ,
			"whetherLongResidence" : [null , [Validators.required]] ,
			"familySituationIsReal" : [null , [Validators.required]] ,
			"populationComposition" : [null , [Validators.required]] ,
			"contacts" : this.fb.array([ this.createContact() ]) ,
			"companyName" : [null ,[Validators.required]] ,
			"companyPhoneNumber" : [null ,[Validators.required]] ,
			"jobTitle" : [null ,[Validators.required]] ,
			"currentCompanyEntryTime" : [null ,[Validators.required]] ,
			"workingYears" : [null ,[Validators.required]] ,
			"monthlyIncome" : [null ,[Validators.required]] ,
			"incomeCertifies" : [null ,[Validators.required]] ,
			"incomeCertifiesJobTitle" : [null ,[Validators.required]] ,
			// "employeeSocialInsuranceAmount" : [null ,[Validators.required]] ,
			"providentFundAmount" : [null] ,
			"salaryPaymentForm" : [null ,[Validators.required]] ,
			"currentCompanyAddress" : [null ,[Validators.required]] ,
			"operateInformationOptions" : [null ,[Validators.required]] ,
			"operateInformationRemark" : [null ,[Validators.required]] ,
			"operatingYears" : [null ,] ,
			"initialInvestment" : [null] ,
			"annualOperatingIncome" : [null] ,
			"employeeNumber" : [null] ,
			"hasSocialInsurance" : [null ] ,
			"employeeSocialInsuranceAmount" : [null] ,
			"laborCosts" : [null ] ,
			"utilities" : [null ],
			"operationNature" : [null] ,
			"operatingProfit" : [null] ,
			"inventoryValue" : [null] ,
			"receivableAmount" : [null] ,
			"accountPeriod" : [null] ,
			"payableAmount" : [null] ,
			"upstreamCooperation" : [null] ,
			"downstreamCooperation" : [null] ,
			"accountingSettlementMethod" : [null] ,
			"accountingSettlementRemark" : [null] ,
			"realEstateAmount" : [null] ,
			"housingValuation" : [null] ,
			"jianAnValuation" : [null] ,
			"vehicleNumber" : [null] ,
			"vehicleBrands" : [null] ,
			"vehicleValuation" : [null] ,
			"otherAssets" : [null] ,
			"otherAssetsDetail" : [null] ,
			"otherAssetsValuation" : [null] ,
			"totalAssetsAmount" : [null] ,
			"totalCreditLiabilityAmount" : [null] ,
			"totalNoneCreditLiabilityAmount" : [null] ,
			"creditCardMonthRepayAmount" : [null] ,
			"loanMonthRepayAmount" : [null] ,
			"overdueReasons" : [null] ,
			"financialInstitutions" : this.fb.array([ this.createInsti() ]) ,
		});
	};
	initTelRecordForm(){
		this.telRecordForm = this.fb.group({
			"contactName" : [null , [Validators.required]] ,
			"contactPhoneNumber" : [null , [Validators.required]] ,
			"contactRelation" : [null , [Validators.required]] ,
			"phoneAuditTime" : [null , [Validators.required]],
			"hasPutThrough" : [null , [Validators.required]] ,
			"remark" : [null ]
		})
	};
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
	current : number = 0;
	showRefuse(){
		this.refuseModel = true ;
	};

	nextStep(){
		let idx = this.current ; 
		if(idx == 0){
			let passMark = this.reportForm.valid ;
			if(!passMark){
				this.msg.notifyErr("进入下一步失败" , "请检查每项信息填写完毕") ;
				return ;
			};
			this.saveReport() ;
		};

		if(idx == 1){
			this.current = 2 ;
		};
		if(idx == 2){
			let passMark = this.telCheckForm.valid ;
			if(!passMark){
				this.msg.notifyErr("进入下一步失败" , "请检查每项信息填写完毕") ;
				return ;
			};
			this.saveTelCheckForm() ;
		};

		if(idx == 3){
			let passMark = this.makeCheckForm.valid ;
			if(!passMark){
				this.msg.notifyErr("进入下一步失败" , "请检查每项信息填写完毕") ;
				return ;
			};
			this.saveFirstCheck() ;
		}
	};
	saveReport(){
		let postData = this.reportForm.value ;
		postData['orderId'] = this.checkInfo['id'] ;
		this.orderSer.saveRepost( postData )
			.subscribe(
				res => {
					if(res['success'] == true){
						this.current = 1 ;
					}else{
						this.msg.error("保存信用报告失败 , 原因: " + res['msg']) ;
					};
				}
			)
	};
	saveTelCheckForm(){
		let postData = this.telCheckForm.value ;
		postData['orderId'] = this.checkInfo['id'] ;
		this.orderSer.saveTelCheck(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.current = 3 ;
					}else{
						this.msg.error("保存电核结果失败, 原因: " + res['msg']) ;
					};
				}
			)
	};
	saveFirstCheck(){
		let postData = this.makeCheckForm.value ;
		postData['orderId'] = this.checkInfo['id'] ;
		postData['status']= 1 ;
		this.orderSer.saveFirstCheck(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						// this.current = 1 ;
					}else{
						this.msg.error("提交失败, 原因: " + res['msg']) ;
					};
				}
			)
	}
	nextStepTest(type){
		if(type == 'up')
			this.current -= 1 ;
		else
			this.current += 1 ;
	} ;

	imgUploads : object[] = [] ;
	imgSelect : string = '5800,网查截图' ;
	imgUpload($event){
		let profileInfo = this.imgSelect.split(",") ;
		let tar = $event.target.files[0];
		let id = this.checkInfo['id'] ;
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
			formData.set("sourceType" ,  "5800");
			formData.set("orderId" , id );
			formData.set("files" , tar);
		this.imgSer.imgUpload(formData)
			.subscribe(
				res => {
					if(res['success'] == true){
						_info['imgs'][_info['imgs'].length -1]['url'] = res['data'][0]['url'];
						_info['imgs'][_info['imgs'].length -1]['id'] = res['data'][0]['id'];
						_info['imgs'][_info['imgs'].length -1]['size'] = size ;
						_info['imgs'][_info['imgs'].length -1]['name'] = tar.name ;
						this.msg.success("图片上传成功") ;
					}else{
						this.msg.error("图片上传失败,原因" + res['msg']) ;
					}
				}
			);
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
	
	tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "联系人"  , type:"text" ,reflect : "contactName"},
			{ name : "电话"  , type:"text" ,reflect : "contactPhoneNumber"},
			{ name : "关系"  , type:"text" ,reflect : "contactRelation" , filter : val => {
				let map = {
					"0": "父母",
					"1": "子女",
					"2": "配偶",
					"3": "兄弟姐妹",
					"4": "亲戚",
					"5": "朋友",
					"6": "同学",
					"7": "同事",
					"8": "其他"
				  };
				let value = map[val['contactRelation']];
				return value ? value : "" ;
			}},
			{ name : "电核时间"  , type:"text" ,reflect : "phoneAuditTime" , filter: val => {
				return dataFormat(val['phoneAuditTime']) ;
			}},
			{ name : "是否拨通"  , type:"text" ,reflect : "hasPutThrough" , filter : val => {
				return val['hasPutThrough'] == 1 ? "是" : "否" ;
			}},
			{ name : "电核人"  , type:"text" ,reflect : "phoneAuditEmployee"},
			{ name : "备注"  , type:"text" ,reflect : "remark"}
		] ,
		data : [],
		btnGroup : {
			title : "操作" ,
			data : [
				{
					textColor : "#80accf",
					name : "编辑",
					ico : "anticon anticon-edit" ,
					bindFn : function(item){
						for(let keys in item){
							item[keys] = item[keys] + '' ;
							item['phoneAuditTime'] = dataFormat(item['phoneAuditTime'] , 'y-m-d') ;
						};
						__this.telRecordAddModel = true ;
						__this.telRecordForm.patchValue(item) ;
						__this.editMark = true ;
						__this.selectTelRecord = item ;
					}
				}
			]
		}
	};
	getTelRecord(){
		let id = this.checkInfo['id'] ;
		this.orderSer.getTelRecord(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data'] ;
					}else{
						this.msg.error("获取电核记录出错,原因:" + res['msg']) ;
					}
				}
			)
	};

	telRecordAddModel : boolean = false ;
	editMark : boolean = false ;
	addTelReord(){
		this.telRecordAddModel = true ;
		this.editMark = false ;
		this.telRecordForm.reset() ;
	};
	makeNewTelRec(){
		let postData = this.telRecordForm.value ;
		postData['orderId'] = this.checkInfo['id'] ;
		this.orderSer.postTelRecord(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("添加成功") ;
						this.getTelRecord() ;
						this.telRecordAddModel = false ;
					}else{
						this.msg.error("添加失败,原因:" + res['msg']) ;
					};
				}
			);
	}
	selectTelRecord : object ;
	saveTelRec(){
		let postData = this.telRecordForm.value ;
		postData['orderId'] = this.checkInfo['id'] ;
		postData['id'] = this.selectTelRecord['id'] ;
		this.orderSer.editTelRecord(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("修改成功") ;
						this.getTelRecord() ;
						this.telRecordAddModel = false ;
					}else{
						this.msg.error("修改失败,原因:" + res['msg']) ;
					};
				}
			);
	};
	idCardChange($event){
		let val = $event.target.value ;
		if(val.length >= 10) {
			var year = val.substring(6, 10)
			var arr=['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊'];
			
			let value = arr[year % 12 ] ;
			this.telCheckForm.patchValue({
				"chineseZodiac" : value  
			});
		}else{
			this.telCheckForm.patchValue({
				"chineseZodiac" : ""
			})
		}
	};
	getReport(){
		this.orderSer.getRepost(this.checkInfo['id'])
			.subscribe(
				res => {
					if(res['success'] == true){
						if(res['data']){
							for(let keys in res['data']){
								res['data'][keys] = res['data'][keys] + "" ;
							}
							this.reportForm.patchValue(res['data']) ;
						}
					}else{
						this.msg.error("获取资料信息出错,原因:" + res['msg']) ;
					};
				}
			)
	};
	getFirstImg(){
		this.orderSer.getFirstImg(this.checkInfo['id'])
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
						this.msg.error("获取资料信息出错,原因:" + res['msg']) ;
					};
				}
			)
	};
	getTelResult(){
		this.orderSer.getTelResult(this.checkInfo['id'])
			.subscribe(
				res => {
					if(res['success'] == true){
						let obj = {} ;
						
						for(let keys in res['data']){
							let val = res['data'][keys] ;
							if(typeof val != 'object'){
								res['data'][keys] = res['data'][keys] + "" ;
							};

							if(res['data'][keys]){
								obj[keys] = res['data'][keys] ;
							}
						};
						this.telCheckForm.patchValue(obj)
					}else{
						this.msg.error("电核结果,原因:" + res['msg']) ;
					};
				}
			)
	};
};
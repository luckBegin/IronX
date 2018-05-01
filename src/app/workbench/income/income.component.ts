import { Component , OnInit } from '@angular/core' ;
import { EmitService } from '../../service/event-emit.service' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { Router , ActivatedRoute } from '@angular/router' ;
import { AbstractControl,FormBuilder,FormControl,FormGroup,Validators , } from '@angular/forms';
import { DateReflect } from '../../service/date-reflect' ;
import { ImgService } from '../../service/img/img.service';
import { Userservice } from '../../service/user/user.service' ;
import { PostDataModel } from './postData.model';
import { SessionStorageService } from '../../service/storage/session_storage';
import { OrderSevice } from '../../service/order/order.service';
import { WorkbenchAll } from '../../service/workbench/all.service'
@Component({
	selector : "app-income" ,
	templateUrl : './income.component.html' ,
	styleUrls: ['./income.component.less']
})
export class InComeComponent implements OnInit{
	constructor(
		private emit : EmitService ,
		private msg : MsgService,
		private router : Router,
		private routerInfo : ActivatedRoute,
		private fb: FormBuilder ,
		private imgSer : ImgService,
		private lgo : SessionStorageService ,
		private usrSer : Userservice ,
		private orderSer : OrderSevice ,
		private allSer : WorkbenchAll
	){};

	ngOnInit(){


		// this.reportForm = this.fb.group({
		// 	"userName" : [null ,  ] ,
		// 	"idNumber" : [null ,  ] ,
		// 	"houseAddress" : [null ,  ] ,
		// 	"nowAddress" : [null ,  ] ,
		// 	"nowAddressHasReal" : [null , ] ,
		// 	"maritalCondition" : [null , ] ,
		// 	"houseAddressHasReal" : [null ,  ] ,
		// 	"childrenCondition" : [null , ] ,		
		// 	"folkHasKnow" : [null , ] ,		
		// 	"folkHasKnowRemark" : [null , ] ,		
		// 	"userPhone" : [null , ] ,		
		// 	"unitPhone" : [null , ] ,		
		// 	"matePhone" : [null , ] ,		
		// 	"companyName" : [null , ] ,		
		// 	"companyAddress" : [null , ] ,		
		// 	"companyAddressHasReal" : [null , ] ,
		// 	"workingTime" : [null , ] ,
		// 	"industry" : [null , ] ,
		// 	"workingSeniority" : [null , ] ,
		// 	"share" : [null , ] ,
		// 	"monthlyIncome" : [null , ] ,
		// 	"hasSocialSecurity" : [null , ] ,
		// 	"welfare" : [null , ] ,
		// 	"houseNumber" : [null , ] ,
		// 	"carNumber" : [null , ] ,
		// 	"carBrand" : [null , ] ,
		// 	"loanAmount" : [null , ] ,
		// 	"folkLoan" : [null , ] ,
		// 	"folkLoanNumber" : [null , ] ,
		// 	"folkLoanAmount" : [null , ] ,
		// 	"familyFirstIncome" : [null , ] ,
		// 	"familySecondIncome" : [null , ] ,
		// 	"publicPraise" : [null , ] ,
		// 	"addressHasReal" : [null , ] ,
		// 	"inhabitantNumber" : [null , ] ,
		// 	"inhabitant" : [null , ] ,
		// 	"loanPurposeHasReal" : [null , ] ,
		// 	"repayPower" : [null , ] ,
		// 	"settleCondition" : [null , ] ,
		// 	"creditCondition" : [null , ] ,
		// 	"conclusion" : [null , ] ,
		// 	"negativeInformation" : [null ,  ],
		// 	"negativeInformationRemark" : [null ,  ],
		// 	"publicPraiseRemark" : [null ,  ],
		// 	"loanPurpose" : [null ,  ],
		// 	"loanPurposeRemark" : [null ,  ],
		// 	"interviewTime" : [null ,  ],
		// 	"ombudsman" : [null ,  ],
		// }) ;
		this.orderInfo = this.lgo.get("orderInfo") ;
		this.getAllDue() ;
		this.initReportForm() ;
		this.initReportForm2() ;
		this.getOrderInfo() ;
	};
	orderInfo : object ;
	reportForm : FormGroup ;
	reportForm2 : FormGroup ;

	initReportForm(){
		this.reportForm = this.fb.group({
			dueDiligenceAssetsLiabilitiesVO : this.fb.group({
				carBrand : [null ,  ],
				carNumber: [null ,  ],
				familyFirstIncome : [null ,  ],
				familySecondIncome : [null ,  ],
				folkLoan: [null ,  ],
				folkLoanAmount : [null ,  ],
				folkLoanNumber: [null ,  ],
				houseNumber: [null ,  ],
				loanPurposeRemark : [null ,  ],
				loanAmount: [null ,  ],
				loanNumber: [null ,  ],
				loanPurpose: [null ,  ],
				negativeInformation : [null ,  ],
				negativeInformationRemark : [null ,  ],
				orderId : [null ,  ],
				publicPraise : [null ,  ],
				publicPraiseRemark : [null ,  ] ,
				id : [null]
			}),
			dueDiligenceBasicInformationVO : this.fb.group({
				childrenCondition:[null , ],
				companyAddress:[null , ],
				companyName:[null , ],
				diligencePurpose:[null , ],
				folkHasKnow:[null , ],
				folkHasKnowRemark:[null , ],
				houseAddress:[null , ],
				houseAddressHasReal:[null , ],
				id:[null],
				idNumber:[null , ],
				maritalCondition:[null , ],
				matePhone:[null , ],
				nowAddress:[null , ],
				nowAddressHasReal:[null , ],
				orderId:[null , ],
				type:[null , ],
				unitPhone:[null , ],
				userName:[null , ],
				userPhone:[null , ],
			}),
			dueDiligenceComprehensiveAssessmentVO : this.fb.group({
				conclusion:[null , ],
				creditCondition:[null , ],
				interviewTime:[null , ],
				loanPurposeHasReal:[null , ],
				ombudsman:[null , ],
				orderId:[null , ],
				repayPower:[null , ],
				repayWill:[null , ],
				settleCondition:[null , ],
				id : [null]
			}),
			dueDiligenceSurveyAddressVO : this.fb.group({
				addressHasReal:[null , ],
				dwellingEnvironment:[null , ],
				inhabitant:[null , ],
				inhabitantNumber:[null , ],
				orderId:[null , ],
				id : [null]
			}),
			dueDiligenceWorkConditionVO : this.fb.group({
				companyAddressHasReal:[null],
				companyArea:[null],
				companyNature:[null],
				downstreamCompanyName:[null],
				downstreamCompanyPhone:[null],
				employeeAverageSalary:[null],
				employeeNumber:[null],
				hasSocialSecurity:[null],
				id:[null],
				orderId : [null ,  ],
				industry:[null],
				localLeader:[null],
				monthlyIncome:[null],
				profitMargin:[null],
				share:[null],
				shareHolderNumber:[null],
				upstreamCompanyName:[null],
				upstreamCompanyPhone:[null],
				welfare:[null],
				workingSeniority:[null],
				workingTime:[null],
			})
		})
	}

	initReportForm2(){
		this.reportForm2 = this.fb.group({
			dueDiligenceAssetsLiabilitiesVO : this.fb.group({
				carBrand : [null ,  ],
				carNumber: [null ,  ],
				familyFirstIncome : [null ,  ],
				familySecondIncome : [null ,  ],
				folkLoan: [null ,  ],
				folkLoanAmount : [null ,  ],
				folkLoanNumber: [null ,  ],
				houseNumber: [null ,  ],
				loanPurposeRemark : [null ,  ],
				loanAmount: [null ,  ],
				loanNumber: [null ,  ],
				loanPurpose: [null ,  ],
				negativeInformation : [null ,  ],
				negativeInformationRemark : [null ,  ],
				orderId : [null ,  ],
				publicPraise : [null ,  ],
				publicPraiseRemark : [null ,  ] ,
				id : [null]
			}),
			dueDiligenceBasicInformationVO : this.fb.group({
				childrenCondition:[null , ],
				companyAddress:[null , ],
				companyName:[null , ],
				diligencePurpose:[null , ],
				folkHasKnow:[null , ],
				folkHasKnowRemark:[null , ],
				houseAddress:[null , ],
				houseAddressHasReal:[null , ],
				id:[null],
				idNumber:[null , ],
				maritalCondition:[null , ],
				matePhone:[null , ],
				nowAddress:[null , ],
				nowAddressHasReal:[null , ],
				orderId:[null , ],
				type:[null , ],
				unitPhone:[null , ],
				userName:[null , ],
				userPhone:[null , ],
				
			}),
			dueDiligenceComprehensiveAssessmentVO : this.fb.group({
				conclusion:[null , ],
				creditCondition:[null , ],
				interviewTime:[null , ],
				loanPurposeHasReal:[null , ],
				ombudsman:[null , ],
				orderId:[null , ],
				repayPower:[null , ],
				repayWill:[null , ],
				settleCondition:[null , ],
				id : [null]
			}),
			dueDiligenceSurveyAddressVO : this.fb.group({
				addressHasReal:[null , ],
				dwellingEnvironment:[null , ],
				inhabitant:[null , ],
				inhabitantNumber:[null , ],
				orderId:[null , ],
				id : [null]
			}),
			dueDiligenceWorkConditionVO : this.fb.group({
				companyAddressHasReal:[null],
				companyArea:[null],
				companyNature:[null],
				downstreamCompanyName:[null],
				downstreamCompanyPhone:[null],
				employeeAverageSalary:[null],
				employeeNumber:[null],
				hasSocialSecurity:[null],
				id:[null],
				orderId : [null] ,
				industry:[null],
				localLeader:[null],
				monthlyIncome:[null],
				profitMargin:[null],
				share:[null],
				shareHolderNumber:[null],
				upstreamCompanyName:[null],
				upstreamCompanyPhone:[null],
				welfare:[null],
				workingSeniority:[null],
				workingTime:[null],
			}),
			dueDiligenceCompanyReconnaissanceVO : this.fb.group({
				hasMechanicalEquipment:[null],
				hasSeasonality:[null],
				homesUsing:[null],
				id:[null],
				mainRepertory:[null],
				mechanicalEquipmentNumber:[null],
				mechanicalEquipmentType:[null],
				monthUtilities:[null],
				orderId:[null],
				otherAssetRemark:[null],
				power:[null],
				repertoryNumber:[null],
				seasonalityDistribution:[null],
				workRate:[null],
				workSiteNature:[null],
			}),
			dueDiligenceCompanyOperationConditionVO : this.fb.group({
				appreciationTax:[null],
				businessTax:[null],
				id:[null],
				mainManageProject:[null],
				monthTurnover:[null],
				orderId:[null],
				otherAmount:[null],
				preTaxProfit:[null],
				productCost:[null],
				receiveRepayAmount:[null],
				receiveType:[null],
				rentCost:[null],
				salaryCost:[null],
				sellCost:[null],
			})
		})
	}


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

	AllDueList : object[] ;
	getAllDue(){
		this.usrSer.getAllDue()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.AllDueList = res['data'] ;
					}else{
						this.msg.error("获取尽调人员失败") ;
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
			// formData.set("orderId" , this.orderId +"");
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

	saveReport(){
		let type = this.reportInfo['dueDiligenceBasicInformationVO']['type'] ; 
		let postData ; 
		if(type == 0){
			postData = this.reportForm2.value ;
		}else{
			postData = this.reportForm.value ;
		};
		postData['orderStatus'] = this.orderInfo['status'] ;
		console.log(postData) ;

		if(!this.reportForm.valid){
			this.msg.warn("请检测每项填写信息");
			return ;
		};

		this.orderSer.postReport(postData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("图片删除成功");
					}else{
						this.msg.error("保存失败,原因:" +res['msg']) ;
					}
				}
			);
	};
	reportInfo : object ;
	type : number ;
	getOrderInfo(){
		let id = this.orderInfo['id']
		this.orderSer.getReport(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.reportInfo = res['data'][_arr(res['data'])] ;

						this.type = this.reportInfo['dueDiligenceBasicInformationVO']['type'] ;
						if(this.type == 1){
							this.reportForm2.patchValue(res['data']) ;

							for(let keys in this.reportInfo){
								let control = this.reportForm2.controls[keys] ;

								if(control){
									let data = this.reportInfo[keys] ;
									let _data = {} ;
									for(let keys2 in data){
										if(data[keys2] != 'null' || data[keys2] != null){
											_data[keys] = data[keys2] ;
										};
									};
									control.patchValue(this.reportInfo[keys]) ;
								};
							};
							 
						}else{
							this.reportForm.patchValue(res['data']) ;
							this.reportForm2.patchValue(res['data'])

							console.log(this.reportInfo)
							for(let keys in this.reportInfo){
								let control = this.reportForm2.controls[keys] ;

								if(control){
									let data = this.reportInfo[keys] ;
									let _data = {} ;
									for(let keys2 in data){
										if(data[keys2] != 'null' || data[keys2] != null){
											_data[keys] = data[keys2] ;
										};
									};
									control.patchValue(this.reportInfo[keys]) ;
								};
							};
						};
					}else{
						this.msg.error("获取相关信息失败,原因:"+res['msg']) ;
					}
				}
			)
	}
};

let _arr = (obj : object) => {
	let _arr = [] ;
	for(let keys in obj){
		_arr.push(keys) ;
	};

	_arr.sort(function(a,b){
		if(a<b)
			return 1 ;
		else
			return -1 ;
	});
	return _arr[0] ;
}
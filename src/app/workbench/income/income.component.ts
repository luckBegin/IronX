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
		private usrSer : Userservice
	){};

	ngOnInit(){

		this.reportForm = this.fb.group({
			"userName" : [null , [Validators.required]] ,
			"idNumber" : [null , [Validators.required]] ,
			"houseAddress" : [null , [Validators.required]] ,
			"nowAddress" : [null , [Validators.required]] ,
			"nowAddressHasReal" : [null ,[Validators.required]] ,
			"maritalCondition" : [null ,[Validators.required]] ,
			"houseAddressHasReal" : [null , [Validators.required]] ,
			"childrenCondition" : [null ,[Validators.required]] ,		
			"folkHasKnow" : [null ,[Validators.required]] ,		
			"folkHasKnowRemark" : [null ,[Validators.required]] ,		
			"userPhone" : [null ,[Validators.required]] ,		
			"unitPhone" : [null ,[Validators.required]] ,		
			"matePhone" : [null ,[Validators.required]] ,		
			"companyName" : [null ,[Validators.required]] ,		
			"companyAddress" : [null ,[Validators.required]] ,		
			"companyAddressHasReal" : [null ,[Validators.required]] ,
			"workingTime" : [null ,[Validators.required]] ,
			"industry" : [null ,[Validators.required]] ,
			"workingSeniority" : [null ,[Validators.required]] ,
			"share" : [null ,[Validators.required]] ,
			"monthlyIncome" : [null ,[Validators.required]] ,
			"hasSocialSecurity" : [null ,[Validators.required]] ,
			"welfare" : [null ,[Validators.required]] ,
			"houseNumber" : [null ,[Validators.required]] ,
			"carNumber" : [null ,[Validators.required]] ,
			"carBrand" : [null ,[Validators.required]] ,
			"loanAmount" : [null ,[Validators.required]] ,
			"folkLoan" : [null ,[Validators.required]] ,
			"folkLoanNumber" : [null ,[Validators.required]] ,
			"folkLoanAmount" : [null ,[Validators.required]] ,
			"familyFirstIncome" : [null ,[Validators.required]] ,
			"familySecondIncome" : [null ,[Validators.required]] ,
			"publicPraise" : [null ,[Validators.required]] ,
			"addressHasReal" : [null ,[Validators.required]] ,
			"inhabitantNumber" : [null ,[Validators.required]] ,
			"inhabitant" : [null ,[Validators.required]] ,
			"loanPurposeHasReal" : [null ,[Validators.required]] ,
			"repayPower" : [null ,[Validators.required]] ,
			"settleCondition" : [null ,[Validators.required]] ,
			"creditCondition" : [null ,[Validators.required]] ,
			"conclusion" : [null ,[Validators.required]] ,
			"negativeInformation" : [null , [Validators.required]],
			"negativeInformationRemark" : [null , [Validators.required]],
			"publicPraiseRemark" : [null , [Validators.required]],
			"loanPurpose" : [null , [Validators.required]],
			"loanPurposeRemark" : [null , [Validators.required]],
			"interviewTime" : [null , [Validators.required]],
			"ombudsman" : [null , [Validators.required]],
		}) ;

		this.getAllDue() ;
	};

	reportForm : FormGroup ;
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
						console.log(res['data']) ;
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
}
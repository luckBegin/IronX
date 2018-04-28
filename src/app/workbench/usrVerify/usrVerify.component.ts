import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { Router , ActivatedRoute} from '@angular/router' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { OrderSevice } from '../../service/order/order.service';
import { ProductService } from '../../service/product/product.service'
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { dataFormat } from '../../format/dateFormat';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ImgService} from '../../service/img/img.service'
declare var $: any; 
let __this  ;
@Component({
	selector : "" ,
	templateUrl : './usrVerify.component.html' ,
	styleUrls : ['./usrVerify.component.less']
})
export class UsrVerifyComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private msg : MsgService ,
		private orderSer : OrderSevice ,
		private fb : FormBuilder ,
		private routerInfo : ActivatedRoute ,
		private proSer : ProductService ,
		private imgSer :ImgService
	){};

	checkInfo : object ;
	ngOnInit(){
		__this = this ;
		this.orderId = this.routerInfo.snapshot.params['id'] ; 
		this.orderInfo = this.sgo.get("checkInfo")
	};

	orderId : number ;
	orderInfo : object ;
	imgSelect : string = '3800'
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
	submit(){
		let orderInfo = this.orderInfo ;
		let postObj = {
			"opinion": "",
			"orderStatus": orderInfo['status']
		};
		this.orderSer.postVerify(postObj , orderInfo['id'])
		.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功");
					}else{
						this.msg.error("操作失败,原因:" + res['msg']) ;
					}
				}
			)
	};
};
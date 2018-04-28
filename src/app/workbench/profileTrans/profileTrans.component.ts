import { Component , OnInit } from '@angular/core' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
import { Router , ActivatedRoute} from '@angular/router' ;
import { MsgService } from '../../service/msg/msg.service' ;
import { OrderSevice } from '../../service/order/order.service';
import { ProductService } from '../../service/product/product.service'
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { dataFormat } from '../../format/dateFormat';
import { ValueTransformer } from '@angular/compiler/src/util';
import { GLOBAL } from '../../global/global_settion'
declare var $: any; 
let __this  ;
@Component({
	selector : "" ,
	templateUrl : './profileTrans.component.html' ,
	styleUrls : ['./profileTrans.component.less']
})
export class ProfileTransComponent implements OnInit{
	constructor(
		private sgo : SessionStorageService ,
		private router : Router ,
		private msg : MsgService ,
		private orderSer : OrderSevice ,
		private fb : FormBuilder ,
		private routerInfo : ActivatedRoute ,
		private proSer : ProductService ,
	){};

	checkInfo : object ;
	ngOnInit(){
		__this = this ;
		this.orderId = this.routerInfo.snapshot.params['id'] ; 
		this.getAllImg() ;
	};

	orderId : number ;
	imgUploads : object[] = [] ;
	getAllImg(){
		this.orderSer.getAllImg(this.orderId)
			.subscribe(
				res => {
					if(res['success'] == true){
						if(res['data'])
							for(let keys in res['data']){
								let item  = res['data'][keys] ;
								let _info = {
									title :keys ,
									id : 0,
									imgs : [],
									active : false
								};
								item.forEach( item2 => {
									let _arr = {
										url : item2.url ,
										name : item2.fileName,
										imgSize : "未知" ,
										id : item2.id ,
										active :false 
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

	submit(){
		let _arr = forEach(this.imgUploads,'chose') ;
		let id = this.orderId ;
		let url = GLOBAL.API.download.img
		window.open(url+"?orderId="+id+"&sourceIds="+_arr) ;
	}
	choseImg(item){
		item.active = !item.active ;
	}
	all(){
		let _arr = forEach(this.imgUploads) ;
		let id = this.orderId ;
		let url = GLOBAL.API.download.img
		window.open(url+"?orderId="+id+"&sourceIds="+_arr) ;
	}
	choseClassImg(idx:number){
		let act = this.imgUploads[idx]['active']
		this.imgUploads[idx]['imgs'].forEach( item => {
			item.active = !act ;
		});

		this.imgUploads[idx]['active'] = !this.imgUploads[idx]['active'] ;
	}
};

const forEach = (array : object[] , model: string = 'all') : string => {
	let _arr = ''

	array.forEach( item => {
		if(model == 'all'){
			item['imgs'].forEach( item2 => {
				_arr += item2.id + ",";
			})
		}else{
			item['imgs'].forEach( item2 => {
				if(item2.active)
					_arr += item2.id + ",";
			})
		};
	});
	return _arr ;
};
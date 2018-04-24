import { Component ,OnInit } from '@angular/core' ;
import { Userservice } from '../../service/user/user.service';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service';
import { Router } from '@angular/router' ;
import { SessionStorageService } from '../../service/storage/session_storage' ;
let __this ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './personal.component.html' ,
	styleUrls : ['./personal.component.less']
})
export class PersonalComponent implements OnInit{
	constructor(
		private usrSer : Userservice ,
		private msg : MsgService ,
		private fb : FormBuilder ,
		private emit : EmitService,
		private router : Router ,
		private sgo : SessionStorageService
	){};

	ngOnInit(){
		this.getLoginInfo() ;
		this.emit.eventEmit.emit({
			type : "title" ,
			title : "个人中心" ,
			url : "/permission/personal"
		});
	} ;

	loginInfo : object ;

	getLoginInfo(){
		this.usrSer.getLoginUser()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.loginInfo = res['data'] ;
					}else{
						this.msg.error("获取用户信息失败") ;
					};
				}
			);
	};
	passMark : boolean = false ;
	checked : boolean = true ;
	checked2 : boolean = false ;
	newPass : string = '' ;
	showPass(){
		this.passMark = true ;
	};

	makeNew(){
		let id = this.loginInfo['id']
		let newPassword =  '' ;
		if(this.checked == true){
			newPassword = 'sd123456'
		};
		if(this.checked2 == true && !this.newPass){
			this.msg.error("新密码不能为空") ;
			return ;
		};
		if(this.checked2 == true && this.newPass){
			newPassword = this.newPass ;
		};

		this.usrSer.changePass(id , newPassword)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("操作成功,请重新登录") ;
						this.sgo.remove(['loginInfo']) ;
						this.router.navigate(['/login']) ;
					}else{
						this.msg.error("操作失败,原因" + res['msg']) ;
					};
					this.passMark = false; 
				}
			);
	};
	makeType(type){
		if(type == 1 ){
			this.checked = true ;
			this.checked2 = false ;
		};

		if(type == 2){
			this.checked = false ;
			this.checked2 = true ;
		}
	};
}
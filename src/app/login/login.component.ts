import { Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GLOBAL } from '../global/global_settion';
import { HttpClient , HttpParams } from "@angular/common/http" ;
import { MsgService } from '../service/msg/msg.service' ;
import { SessionStorageService } from '../service/storage/session_storage';
import { Router } from '@angular/router' ;
// <video autoplay="autoplay" loop="loop">  
// <source  src="./assets/video/bg.mp4" type="video/mp4" >; 
// </video>
@Component({
	selector : "app-login" ,
	template : `

		<div class="c-flex-row-center wrap">
			<div class="formWrap">
				<h4 class='title'>
					后台管理系统
					<small>
						Management System
					</small>
				</h4>
				<form style='width:100%'>
					<div class="formSection">
						<i class="anticon anticon-user icoInput"></i>
						<input name='userName' class='input' type="text" placeholder = '请输入用户名' [(ngModel)]='userName' />
					</div>
					<div class="formSection">
						<i class="anticon anticon-lock icoInput"></i>
						<input name='passWord' class='input' type="password" placeholder = '请输入密码' [(ngModel)]='passWord' />
					</div>
					<button (click) = 'login()' class='submitBtn' nz-button nzType="primary">登录</button>
				</form>
			</div>
		</div>
	` ,
	styles : [`
		 *{  
            margin: 0px;  
            padding: 0px;  
        }  
        video{  
            position: fixed;  
            right: 0px;  
            bottom: 0px;  
            min-width: 100%;  
            min-height: 100%;  
            height: auto;  
            width: auto; 
            z-index: -2
        }  
        source{  
            min-width: 100%;  
            min-height: 100%;  
            height: auto;  
            width: auto;  
        }
        .formWrap{
			border-radius: 5px;
			width: 300px;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding: 20px 10px;
			background: rgba(0, 0, 0, 0.38);
        }
        .formWrap::after{
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			content: "";
			display: block;
			z-index: -1;
			border: 1px solid rgba(255, 255, 255, 0.36);
			box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.41);
			border-radius:3px;
        }
        .wrap{
			height:100%;
			background : url(../assets/img/bg_login.jpg) round ;
        }
        .formSection{
        	position:relative ;
        	width:80%;
        	height:35px;
			line-height: 35px;
			margin-left: 10%;
		    margin-bottom: 20px;
        }
        .input{
			width: 100%;
			height:100%;
			background: rgba(255, 255, 255, 0.07);
			border: 1px solid rgba(204, 204, 204, 0.42);
			color: #fff;
		    text-indent: 30px;
		    border-radius:3px;
        }
        .input::-webkit-input-placeholder{
            color:#fff;
        }
        .icoInput{
			position: absolute;
			font-size: 18px;
			line-height: 35px;
			color: #fff;
			left: 5px;
        }
        .submitBtn{
        	width:80%;
        	margin-left:10%;
		}
		.title{
			color: #fff;
			margin-bottom: 16px;
			font-size: 20px;
			font-weight: bolder;
			text-align: center;
			position:relative ;
		}
		.title>small{
			display: block;
			margin-top: 2px;
			margin-bottom: 10px;
		}
	`]
})
export class LoginComponent implements OnInit{

	constructor(
		private http : HttpClient ,
		private msg : MsgService ,
		private sgo : SessionStorageService ,
		private router : Router
	){};
	ngOnInit() {

	};
	userName : string = '' ;
	passWord : string = '' ;

	login(){
		if(!this.userName){
			this.msg.notifyWarn("操作失败","请输入登录用户名")
			return ;
		};
		if(!this.passWord){
			this.msg.notifyWarn("操作失败","请输入登录密码")
			return ;
		};

		let url = GLOBAL.API.login ;
		let para = new HttpParams()
			.set("username" , this.userName)
			.set("password" , this.passWord);
			
		this.http.post(url , para , {
			withCredentials: true
		})
		.subscribe(
			res => {
				if(res['status'] == 'success'){
					this.sgo.set("loginInfo" , res['msg']) ;
					this.router.navigate(['/'])
				}else{
					this.msg.notifyErr("登录失败" , res['msg']) ;
				};
			}
		)
	}
}
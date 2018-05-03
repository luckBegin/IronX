import { Injectable } from '@angular/core';
import { gongzuotai } from './model/gongzuotai.model' ;
import { kehuguanli } from './model/kehuguanli.model' ;
import { daihouguanli } from './model/daihouguanli.model' ;
import { shujutongji } from './model/shujutongji.model' ;
import { quanxianzhongxin } from './model/quanxianzhongxin.model' ;
import { peizhizhongxin } from './model/peizhizhongxin.model' ;
import { yingyonggongju } from './model/yingyonggongju.model' ;
import { caiwuguanli } from './model/caiwuguanli.model' ;
import { Router } from '@angular/router' ;
import { SessionStorageService } from '../storage/session_storage'
const menuList = {
	0 : { 
		title : "工作台" ,
		childs:gongzuotai ,
		type : "menu",
		ico : "anticon anticon-plus-square-o" ,
		id : 0
	} ,
	20 : {
		title : "客户管理",
		childs : kehuguanli,
		type : "menu" ,
		ico : "anticon anticon-plus-square-o" ,
		id: 20
	} ,
	21 : {
		title : "贷后管理" ,
		childs: daihouguanli ,
		type : "menu" ,
		ico : "anticon anticon-plus-square-o" ,
		id :21
	} ,
	27 : {
		title : "财务管理" ,
		childs: caiwuguanli ,
		type : "menu" ,
		ico : "anticon anticon-plus-square-o" ,
		id :27
	} ,
	// 5 : {
	// 	title:"数据统计",
	// 	childs:shujutongji ,
	// 	type:"menu",
	// ico : "anticon anticon-plus-square-o" ,
	// } ,
	6 : {
		title:"权限中心" ,
		childs:quanxianzhongxin,
		type:"menu" ,
		ico : "anticon anticon-plus-square-o" ,
		id :6
	},
	7 : { 
		title :"配置中心" ,
		childs : peizhizhongxin ,
		type : 'menu' ,
		ico : "anticon anticon-plus-square-o" ,
		id : 7
	},
	8 : {
		title : "应用工具" ,
		childs : yingyonggongju ,
		type : 'dropdown',
		ico : "anticon anticon-plus-square-o" ,
		id : 8
	}
};
@Injectable()
export class MenuService {
	constructor(
		private router : Router ,
		private sgo : SessionStorageService
	){};
	getMenu : Function  = ( ids ) : any[] =>{
		let _perArr = this.sgo.get("perArr") ;
		let _arr = [] ;

		ids.forEach( item => {
			if(menuList[item]){
				_arr.push(menuList[item]) ;				
			};
		});

		window['__arr'] = [] ;
		recursion(_arr , window['__arr'] , _perArr) ; 

		let __arr = window['__arr'] ;
		window['__arr'] = null ; 
		return __arr ;
	};

	profileCheck( orderId : number | string , state : number | string){
		this.router.navigate(['/workbench/check/' , orderId], {
			queryParams : {state : state}
		})
	};

	getMenuIdByState(state : number | string){
		let map = {
			"1" : 2 ,
			"2" : 3 ,
			"4" : 12 ,
			"5" : 13 ,
			"6" : 14 ,
			"7" : 15 ,
			"8" : 16 ,
			"9" : 17 ,
			"10" : 18
		};
		return map[state] ;
	};
};

let recursion = function(item ,arr , _arr){
	item.forEach( item => {
		if(_arr.indexOf(item.id) > -1){
			var _obj ;
			_obj = {
				ico : item.ico ,
				id : item.id ,
				title : item.title,
				type : item.type ,
			};

			if(item.url)
				_obj.url = item.url ;
			arr.push(_obj) ;
			if(item.childs){
				_obj.childs = [] ,
				recursion(item.childs , _obj.childs , _arr) ;
			};
		};
	});
};
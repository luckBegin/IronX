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
const menuList = {
	1 : { 
		title : "工作台" ,
		childs:gongzuotai ,
		type : "menu",
		ico : "anticon anticon-plus-square-o" ,
	} ,
	2 : {
		title : "客户管理",
		childs : kehuguanli,
		type : "menu" ,
		ico : "anticon anticon-plus-square-o" ,
	} ,
	3 : {
		title : "贷后管理" ,
		childs: daihouguanli ,
		type : "menu" ,
		ico : "anticon anticon-plus-square-o" ,
	} ,
	4 : {
		title : "财务管理" ,
		childs: caiwuguanli ,
		type : "menu" ,
		ico : "anticon anticon-plus-square-o" ,
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
	},
	7 : { 
		title :"配置中心" ,
		childs : peizhizhongxin ,
		type : 'menu' ,
		ico : "anticon anticon-plus-square-o" ,
	},
	8 : {
		title : "应用工具" ,
		childs : yingyonggongju ,
		type : 'dropdown',
		ico : "anticon anticon-plus-square-o" ,
	}
};
@Injectable()
export class MenuService {
	constructor(
		private router : Router
	){}
	getMenu : Function  = ( ids ) : any[] =>{
		let _arr = [] ;

		ids.forEach( item => {
			if(menuList[item])
				_arr.push(menuList[item]) ;
		});
		
		return _arr ;
	};

	profileCheck( orderId : number | string , state : number | string){
		this.router.navigate(['/workbench/check/' , orderId], {
			queryParams : {state : state}
		})
	};

	getMenuIdByState(state : number | string){
		let map = {
			"2" : 3 ,
			"4" : 12 ,
			"5" : 13 ,
			"6" : 14 ,
			"7" : 15 ,
			"8" : 16 ,
			"9" : 17 ,
			"10" : 18
		};

		return map[state]
	}
};

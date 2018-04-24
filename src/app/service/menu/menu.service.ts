import { Injectable } from '@angular/core';
import { gongzuotai } from './model/gongzuotai.model' ;
import { kehuguanli } from './model/kehuguanli.model' ;
import { daihouguanli } from './model/daihouguanli.model' ;
import { shujutongji } from './model/shujutongji.model' ;
import { quanxianzhongxin } from './model/quanxianzhongxin.model' ;
import { peizhizhongxin } from './model/peizhizhongxin.model' ;
import { yingyonggongju } from './model/yingyonggongju.model' ;
import { caiwuguanli } from './model/caiwuguanli.model' ;
const menuList = {
	1 : { 
		title : "工作台" ,
		data:gongzuotai ,
		type : "menu" 
	} ,
	2 : {
		title : "客户管理",
		data : kehuguanli,
		type : "menu" 
	} ,
	3 : {
		title : "贷后管理" ,
		data: daihouguanli ,
		type : "menu" ,
	} ,
	4 : {
		title : "财务管理" ,
		data: caiwuguanli ,
		type : "menu" ,
	} ,
	5 : {
		title:"数据统计",
		data:shujutongji ,
		type:"menu"
	} ,
	6 : {
		title:"权限中心" ,
		data:quanxianzhongxin,
		type:"menu" ,
	},
	7 : { 
		title :"配置中心" ,
		data : peizhizhongxin ,
		type : 'menu' ,
	},
	8 : {
		title : "应用工具" ,
		data : yingyonggongju ,
		type : 'dropdown'
	}
};
Injectable()
export class MenuService {
	getMenu : Function  = ( ids ) : any[] =>{
		let _arr = [] ;

		ids.forEach( item => {
			if(menuList[item])
				_arr.push(menuList[item]) ;
		});
		
		return _arr ;
	};
};

import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'afterLoan'
export const daihouguanli : MenuItemModel[] = [
	{
		id : 22 , 
		title : "还款管理" ,
		url : `/${prefix_url}/repay`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 23 , 
		title : "催收管理" ,
		url : `/${prefix_url}/collect`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 24 , 
		title : "起诉管理" ,
		url : `/${prefix_url}/sue`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 25 , 
		title : "已提交起诉" ,
		url : `/${prefix_url}/hasSue`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 26 , 
		title : "已确认起诉" ,
		url : `/${prefix_url}/madeSue`,
		ico : "anticon anticon-plus-square-o" ,
	}
]
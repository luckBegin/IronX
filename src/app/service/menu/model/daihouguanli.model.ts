import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'loan'
export const daihouguanli : MenuItemModel[] = [
	{
		id : 1 , 
		title : "贷后管理" ,
		url : `/${prefix_url}/loan`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "财务管理" ,
		url : `/${prefix_url}/financial`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "收款明细" ,
		url : `/${prefix_url}/detail`,
		ico : "anticon anticon-plus-square-o" ,
	}
]
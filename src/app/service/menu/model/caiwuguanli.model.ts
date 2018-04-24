import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'financial'
export const caiwuguanli : MenuItemModel[] = [
	{
		id : 1 , 
		title : "复核到账" ,
		url : `/${prefix_url}/recheck`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "放款明细" ,
		url : `/${prefix_url}/loan`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "收款明细" ,
		url : `/${prefix_url}/get`,
		ico : "anticon anticon-plus-square-o" ,
	}
]
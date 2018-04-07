import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'data'
export const shujutongji : MenuItemModel[] = [
	{
		id : 1 , 
		title : "客户统计报表" ,
		url : `/${prefix_url}/usr`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "贷款统计报表" ,
		url : `/${prefix_url}/loan`,
		ico : "anticon anticon-plus-square-o" ,
	}
]
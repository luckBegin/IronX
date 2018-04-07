import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'permission'
export const quanxianzhongxin : MenuItemModel[] = [
	{
		id : 1 , 
		title : "组织结构" ,
		url : `/${prefix_url}/org`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "个人中心" ,
		url : `/${prefix_url}/personal`,
		ico : "anticon anticon-plus-square-o" ,
	}
]
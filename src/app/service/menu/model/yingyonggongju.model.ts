import { MenuItemModel } from '../menu-item.model' ;
let prefix_url = 'tools/tools'
export const yingyonggongju : MenuItemModel[] = [
	{
		id : 1 , 
		title : "利息计算器" ,
		url : `/${prefix_url}/calc`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id : 1 , 
		title : "网查网址" ,
		url : `/${prefix_url}/url`,
		ico : "anticon anticon-plus-square-o" ,
	}
]
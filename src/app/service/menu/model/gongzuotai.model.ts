import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'workbench'
export const gongzuotai : MenuItemModel[] = [
	{
		id : 1 , 
		title : "开始进件" ,
		url : `/${prefix_url}/into`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id :0 ,
		title : "全部进件" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/all/1`,
	},{
		id :2 ,
		title : "预审管理" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/precheck`,
	},{
		id :3 ,
		title : "资料补录" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/profile`,
	},{
		id :4 ,
		title : "审批管理" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/approve`,
		childs : [
			{
				id :12,
				title : "初审" ,
				ico : "anticon anticon-plus-square-o" ,
				url : `${prefix_url}/approve/first`,
			},{
				id :13,
				title : "复审" ,
				ico : "anticon anticon-plus-square-o" ,
				url : `${prefix_url}/approve/second`,
			},{
				id :14,
				title : "终审" ,
				ico : "anticon anticon-plus-square-o" ,
				url : `${prefix_url}/approve/third`,
			}
		]
	},{
		id :15 ,
		title : "尽调管理" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/manage`,
	},{
		id :16 ,
		title : "客户确认" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/verify`,
	},{
		id :17 ,
		title : "等待放款(移交)" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/wait`,
	},{
		id :18 ,
		title : "确认放款" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/sure`,
	}
]
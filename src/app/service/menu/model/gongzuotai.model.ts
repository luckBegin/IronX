import { MenuItemModel } from '../menu-item.model' ;

let prefix_url = 'workbench'
export const gongzuotai : MenuItemModel[] = [
	{
		id : 1 , 
		title : "开始进件" ,
		url : `/${prefix_url}/into`,
		ico : "anticon anticon-plus-square-o" ,
	},{
		id :2 ,
		title : "全部进件" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/all`,
	},{
		id :3 ,
		title : "预审管理" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/precheck`,
	},{
		id :4 ,
		title : "资料补录" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/profile`,
	},{
		id :5 ,
		title : "审批管理" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/approve`,
		childs : [
			{
				id :1,
				title : "初审" ,
				ico : "anticon anticon-plus-square-o" ,
				url : `${prefix_url}/approve/first`,
			},{
				id :2,
				title : "复审" ,
				ico : "anticon anticon-plus-square-o" ,
				url : `${prefix_url}/approve/second`,
			},{
				id :3,
				title : "终审" ,
				ico : "anticon anticon-plus-square-o" ,
				url : `${prefix_url}/approve/third`,
			}
		]
	},{
		id :6 ,
		title : "尽调管理" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/manage`,
	},{
		id :7 ,
		title : "客户确认" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/verify`,
	},{
		id :8 ,
		title : "等待放款(移交)" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/wait`,
	},{
		id :9 ,
		title : "确认放款" ,
		ico : "anticon anticon-plus-square-o" ,
		url : `${prefix_url}/sure`,
	}
]
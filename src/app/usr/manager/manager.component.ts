import { Component ,OnInit } from '@angular/core' ;
import { Userservice } from '../../service/user/user.service';
import { SearchModel } from './search.model';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat'
@Component({
	selector : "app-usrManager" ,
	templateUrl : './manager.component.html' ,
	styleUrls : ['./manager.component.less']
})
export class ManagerComponent implements OnInit{
	constructor(
		private usrSer : Userservice ,
		private msg : MsgService
	){};

	ngOnInit(){
		this.getData() ;
	};

	tableData : Object = {
		showIndex : false,
		tableTitle : [
			{ name : "客户编号"  , type:"text" ,reflect : "id"},
			{ name : "姓名"  , type:"text" ,reflect : "userName"},
			{ name : "性别"  , type:"text" ,reflect : "gender" , filter : function(val){
				if(val['gender']){
					let map = {
						1 : "女" ,
						0 : "男"
					}
					return map[val['gender']];
				}else{
					return '- -' ;
				};
			}},
			{ name : "身份证"  , type:"text" ,reflect : "idCard"},
			{ name : "手机号"  , type:"text" ,reflect : "phoneNumber"},
			{ name : "录入时间"  , type:"text" ,reflect : "createTime" ,filter: function(val){
				return dataFormat(val['createTime']) ;
			}},
		] ,
		data : []
	};

	totalSize : number ;
	searchModel : SearchModel = new SearchModel() ;
	getData(){
		this.usrSer.getUserList(this.searchModel)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data'] ;
						this.totalSize = res['page']?res['page']['totalNumber']:0 ;
					}else{
						this.msg.error("获取用户管理数据失败") ;
					};
				}
			);
	};
	reset(){
		this.searchModel = new SearchModel() ;
		this.getData() ;
	};
	search(){
		if(!this.searchModel.code && this.searchModel.code != 0){
			this.msg.error("请选择要搜索的字段") ;
			return ;
		};
		if(!this.searchModel.keyword){
			this.msg.error("搜索内容不能为空") ;
			return ;
		};
		this.getData() ;
	};
	pageChange($size : number , type : string) : void{
		if(type == 'size'){
			this.searchModel.pageSize = $size ;
		};

		if(type == 'page'){
			this.searchModel.currentPage = $size ;
		};

		this.getData() ;
	};
}
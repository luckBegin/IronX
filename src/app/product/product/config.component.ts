import { Component ,OnInit } from '@angular/core' ;
import { ProductService } from '../../service/product/product.service';
import { SearchModel } from './search.model';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { ProductModel } from './product.model';
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
let __this ;
@Component({
	selector : "app-usrManager" ,
	templateUrl : './config.component.html' ,
	styleUrls : ['./config.component.less']
})
export class ConfigComponent implements OnInit{
	constructor(
		private proSer : ProductService ,
		private msg : MsgService ,
		private fb : FormBuilder
	){};

	validateForm: FormGroup;

	static isTimes( control: FormControl ){
		let val = control.value;
		return (val % 6 == 0)?null: { "invalidNumber" : true } ;
	};
	ngOnInit(){
		__this = this ;
		this.getData() ;
		this.validateForm = this.fb.group({
			"productName" : [ null, [ Validators.required ] ] ,
			"annualInterestRate" : new FormControl('', [
					Validators.required ,
					Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)
				]
			),
			"interestPenalty" : new FormControl('', [
					Validators.required ,
					Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)
				]
			),
			"overdueFine" :  new FormControl('', [
					Validators.required ,
					Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)
				]
			),
			"repaymentMode" : [null , [Validators.required]] ,
			"loanDeadline" : [null , [Validators.required , ConfigComponent.isTimes]] ,
			"loanLimit" : new FormControl('', [
					Validators.required ,
					Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)
				]
			),
			"remark" : [null] ,
			"imagePath" : [null]
		});
	};
	tableData : Object = {
		showIndex : false,
		tableTitle : [
			{ name : "产品名称"  , type:"text" ,reflect : "productName"},
			{ name : "年化利率"  , type:"text" ,reflect : "annualInterestRate" , filter:function(val){
				return val['annualInterestRate'] + "%" ;
			}},
			{ name : "罚息"  , type:"text" ,reflect : "interestPenalty" },
			{ name : "滞纳金"  , type:"text" ,reflect : "overdueFine" ,filter:function(val){
				return val['overdueFine'] + "%" ;
			}},
			{ name : "还款方式"  , type:"text" ,reflect : "repaymentMode" },
			{ name : "授额上限"  , type:"text" ,reflect : "loanLimit" },
			{ name : "借款期限"  , type:"text" ,reflect : "loanDeadline" , filter : function(val){
				return val['loanDeadline'] +"个月";
			}},
			{ name : "录入时间"  , type:"text" ,reflect : "createTime" , filter : function(val){
				return dataFormat(val["createTime"])
			}},
			{ name : "备注"  , type:"text" ,reflect : "remark" },
			{ name :"产品封面" , type :"text" ,color: "#1890ff", filter : item => {
				let url = item.imagePath ; 
				if(url){
					return '查看';
				}else{
					return "";
				};
			} ,fn : item => {
				let url = item.imagePath ; 
				__this.proImgCover = url ; 
				__this.coverMark = true ;
			}}
		] ,
		data : [],
		btnGroup : {
			title : "操作" ,
			data : [
				{
					textColor : "#80accf",
					name : "编辑",
					ico : "anticon anticon-edit" ,
					bindFn : function(item){
						__this['productInfo'] = item ;
						__this.editItem(item) ;
					}
				},
				{
					textColor : "#f62121",
					name : "删除",
					ico: "anticon anticon-delete" ,
					bindFn : function(item){
						__this['productInfo'] = item ;
						__this['delMark'] = true ;

					}
				}
			]
		}
	};
	coverMark : boolean = false ;
	proImgCover :string = '' ;
	totalSize : number ;
	searchModel : SearchModel = new SearchModel() ;
	getData(){
		this.proSer.getList(this.searchModel)
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

	productInfo : ProductModel = new ProductModel() ;
	infoBoxShow : boolean = false ;
	editMark : boolean = false ;
	addNew(){
		this.infoBoxShow = true ;
		this.editMark = false ;
		this.productInfo = new ProductModel() ;
		this.validateForm.reset() ;
	};

	editItem(itemInfo : ProductModel){
		let _map = {
			"等额本息" : "0" ,
			"等额本金" : "1" ,
			"先息后本" : "2" ,
			"等本等息" : "3" 
		};

		this.editMark = true ;

		this.infoBoxShow = true ;

		this.productInfo = itemInfo ;
		let method = this.productInfo.repaymentMode ;
		this.validateForm.patchValue({
			productName : this.productInfo.productName,
			annualInterestRate : this.productInfo.annualInterestRate,
			interestPenalty : this.productInfo.interestPenalty,
			overdueFine : this.productInfo.overdueFine,
			repaymentMode : _map[method],
			loanDeadline : this.productInfo.loanDeadline,
			loanLimit : this.productInfo.loanLimit,
			remark : this.productInfo.remark ,
			imagePath : this.productInfo.imagePath
		});
	};

	makeNew(){
		let data = this.validateForm.value ;
		data['id'] = this.productInfo.id ;
		data['annualInterestRate'] = data['annualInterestRate'] / 100 ;
		data['overdueFine'] = data['overdueFine'] / 100 ;

		var formData = new FormData() ;
		formData.append("productName" , data['productName']);
		formData.append("annualInterestRate" , data['annualInterestRate']);
		formData.append("interestPenalty" , data['interestPenalty']);
		formData.append("overdueFine" , data['overdueFine']);
		formData.append("repaymentMode" , data['repaymentMode']);
		formData.append("loanDeadline" , data['loanDeadline']);
		formData.append("loanLimit" , data['loanLimit']);
		formData.append("remark" , data['remark']);

		let file = document.querySelector("#files")['files'][0] ;

		if(!file){
			this.msg.warn("请选择产品封面") ;
			return ;
		};
		formData.append("file" , file)  ;

		this.proSer.createPro(formData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("创建成功") ;
						this.infoBoxShow = false ;
						this.getData() ;
					}else{
						this.msg.error("创建产品失败,原因:" + res['msg']) ;
					};
				}
			)
	};

	delMark : boolean = false ;
	delProduct(){
		let id = this.productInfo.id
		this.proSer.deletePro(id)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("删除成功") ;
						this.delMark = false ;
						this.getData() ;
					}else{
						this.msg.error("删除失败,原因" + res['msg']) ;
					}
				}
			)
	};

	save(){
		let data = this.validateForm.value ;
		data['id'] = this.productInfo.id ;
		data['annualInterestRate'] = data['annualInterestRate'] / 100 ;
		data['overdueFine'] = data['overdueFine'] / 100 ;

		var formData = new FormData() ;
		formData.append("productName" , data['productName']);
		formData.append("annualInterestRate" , data['annualInterestRate']);
		formData.append("interestPenalty" , data['interestPenalty']);
		formData.append("overdueFine" , data['overdueFine']);
		formData.append("repaymentMode" , data['repaymentMode']);
		formData.append("loanDeadline" , data['loanDeadline']);
		formData.append("loanLimit" , data['loanLimit']);
		formData.append("remark" , data['remark']);

		let file = document.querySelector("#files")['files'][0] ;
		if(file)
			formData.append("file" , file)  ;
		else
			formData.append("imagePath",data['imagePath'])
		
		this.proSer.editPro(formData)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("保存成功") ;
						this.infoBoxShow = false ;
						this.getData() ;
					}else{
						this.msg.error("保存失败,原因:" + res['msg']) ;
					};
				}
			)
	}
}
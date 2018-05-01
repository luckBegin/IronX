import { Component , OnInit } from '@angular/core';
import { Router, NavigationEnd , ActivatedRoute } from '@angular/router';
import { ToolService } from '../service/tool/tool.service';
import { ProductService } from '../service/product/product.service'
import { FormBuilder,FormGroup,Validators , FormControl , FormArray} from '@angular/forms';
import { MsgService } from '../service/msg/msg.service' ;
import { CommonValidator } from '../validator/common.validator'
let __this ;
@Component({
  selector: 'app-root',
  templateUrl: './tool.component.html',
  styleUrls : [`/tool.component.less`],
})
export class ToolComponent implements OnInit {
    constructor(
        private routerInfo : ActivatedRoute ,
        private toolSer : ToolService ,
        private proSer : ProductService ,
        private fb : FormBuilder ,
        private msg : MsgService ,
    ){}

    ngOnInit(){
        let type = this.routerInfo.snapshot.params['type'] ; 

        type == 'url' ? this.current = 1 : this.current =  0 ;
        
        this.thirdForm = this.fb.group({
			"agreeMoney": [null , [Validators.required]],
			"annualInterestRate": [null,[Validators.required]],
			"deadLine":  [null,[Validators.required]],
			"productId": [null,[Validators.required]],
			"status":  [null,[Validators.required]],
        });
        
        this.validateForm = this.fb.group({
            "remark": [null],
            "siteAddress": [null , [Validators.required , CommonValidator.isSite]],
            "siteName": [null , [Validators.required]],
        });

        this.getProLst() ;
        this.getSiteList() ;

        __this = this ;
    }
    type : string ;

    
    thirdForm : FormGroup ;

    tableData : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "期数"  , type:"text" ,reflect : "period"},
			{ name : "本期应还(元)"  , type:"text" ,reflect : "totalAmount"},
			{ name : "应还本金(元)"  , type:"text" ,reflect : "principal"},
			{ name : "应还利息(元)"  , type:"text" ,reflect : "totalAmount"}
		] ,
		data : [],
    };

    proList : object[] ;
	getProLst(){
		this.proSer.getList()
			.subscribe(
				res => {
					if(res['success'] == true){
						this.proList = res['data'] ;
					}else{
						this.msg.error("获取产品列表出错,原因:" + res['msg']) ;
					};
				}
			)
    };
    
    choseChange($event){
		this.proList.forEach( item => {
			if(item['id'] == $event){
				this.thirdForm.patchValue({
					"annualInterestRate" :  item['annualInterestRate'] ,
					"deadLine"  : item['loanDeadline']
				});
			};
		})
		this.getCalc() ;
    }
    
    getCalc(){
		let mockMoney = this.thirdForm.value['agreeMoney'];
		let productId = this.thirdForm.value['productId'];
		let deadline = this.thirdForm.value['deadLine'];
		let obj = {
			"borrowAmount" :mockMoney,
			"productId"  : productId ,
			"loanDeadline" :deadline,
		} ;
		this.toolSer.getCalc(obj)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.tableData['data'] = res['data']['repayPlans'];
 					}else{
						this.msg.error("获取还款计划,原因:" + res['msg']) ;
					};
				}
			)
    };

    tableData2 : Object = {
		showIndex : true,
		tableTitle : [
			{ name : "网站名称"  , type:"text" ,reflect : "siteName"},
			{ name : "网站地址"  , type:"text" ,reflect : "siteAddress" , color : "#1890ff" , fn : function(item){
                window.open(item.siteAddress)
            }},
			{ name : "备注"  , type:"text" ,reflect : "remark"}
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
                        __this.selectItem = item ;
                        __this.infoBoxShow = true ; 
                        __this.editMark = true ;
                        __this.validateForm.patchValue(item)
					}
				},
				{
					textColor : "#f62121",
					name : "删除",
					ico: "anticon anticon-delete" ,
					bindFn : function(item){
                        __this.selectItem = item ;
                        __this.delMark = true ;
					}
				}
			]
		}
    };

    getSiteList(){
        this.toolSer.getSideList()
        .subscribe(
            res => {
                if(res['success'] == true){
                    this.tableData2['data'] = res['data'] ;
                }else{
                    this.msg.error("获取查询网址出错,原因:" + res['msg']) ;
                };
            }
        )
    }

    delMark: boolean = false ;
    selectItem : object ;
    delProduct(){
        let id = this.selectItem['id']
        this.toolSer.delSite(id)
            .subscribe(
                res => {
                    if(res['success'] == true){
                        this.msg.success("操作成功") ; 
                        this.delMark = false ;
                        this.getSiteList() ;
                    }else{
                        this.msg.error("操作失败,原因:" + res['msg']) ;
                    };
                }
            )
    };

    validateForm: FormGroup ;
    infoBoxShow : boolean = false ;
    editMark : boolean ; 
    current : number = 0 ;
    addNew(){
        this.validateForm.reset() ;
        this.editMark = false ;
        this.infoBoxShow = true ;
    }
    makeNew(){
        let postData = this.validateForm.value ; 
        this.toolSer.createSite(postData)
            .subscribe(
                res => {
                    if(res['success'] == true){
                        this.msg.success("操作成功") ; 
                        this.infoBoxShow = false ;
                        this.getSiteList() ;
                    }else{
                        this.msg.error("操作失败,原因:" + res['msg']) ;
                    };
                }
            )
    }

    save(){
        let postData = this.validateForm.value ; 
        postData.id = this.selectItem['id'] ;
        
        this.toolSer.editSite(postData)
            .subscribe(
                res => {
                    if(res['success'] == true){
                        this.msg.success("操作成功") ; 
                        this.infoBoxShow = false ;
                        this.getSiteList() ;
                    }else{
                        this.msg.error("操作失败,原因:" + res['msg']) ;
                    };
                }
            )
    }
};
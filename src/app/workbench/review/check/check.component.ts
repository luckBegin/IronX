import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from '../../../service/storage/session_storage';
import {Router} from '@angular/router';
import {WorkbenchAll} from '../../../service/workbench/all.service';
import {MsgService} from '../../../service/msg/msg.service';
import {OrderSevice} from '../../../service/order/order.service';
import {decisionFormat} from '../../../format/DecisionFormat';
import { ActivatedRoute } from '@angular/router';

import { MenuService } from '../../../service/menu/menu.service' ;
import { MenuRemoteServce } from '../../../service/menu_remote/menu.service' ;
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
declare var $: any;
@Component({
  selector: "",
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.less']
})
export class CheckComponent implements OnInit {
  constructor(
      private sgo: SessionStorageService,
      private router: Router,
      private workSer: WorkbenchAll,
      private msg: MsgService,
      private orderSer: OrderSevice,
      private routerInfo : ActivatedRoute,
      private menu : MenuService ,
      private menuRemote : MenuRemoteServce,
      private fb : FormBuilder
    ){};

  ngOnInit() {
    this.checkInfo = this.sgo.get("checkInfo");
    this.getOrderInfo();
    this.getImgs();
    this.getDealRecord();
    this.getAntiFraudObj();

    this.routerInfo.queryParams
      .subscribe(
        para => {
          this.orderState = para['state'] ;
          this.getButtonPermission() ;
        }
      );
      this.bakckForm = this.fb.group({
        destOrderStatus:[null],
        opinion:[null],
        orderStatus:[null],
      });

      this.validateForm = this.fb.group({
        "rejectionReason" : [null , [Validators.required]] ,
        "opinion" : [ null ]
      });
  };

  orderState : number ;
  checkInfo: object;
  orderInfo: object;
  validateForm : FormGroup
  getOrderInfo() {
    let id = this.checkInfo['id'];
    this.workSer.getOderInfo(id)
      .subscribe(
        res => {
          if (res['success'] == true) {
            this.orderInfo = res['data'];
            // this.orderInfo = res['data'];
          } else {
            this.msg.error("获取订单信息失败" + res['message']);
          }
          ;
        }
      );
  };

  imgList: object[];
  passShow(){
    this.passModel = true ;
  }
  refuseShow(){
    this.refuseModel = true ;
  }
  getImgs() {
    let id = this.checkInfo['id'];
    this.orderSer.getImg(id)
      .subscribe(
        res => {
          if (res['success'] == true) {
            let _arr = []
            for (let keys in res['data']) {
              let _obj = {
                title: keys,
                imgs: res['data'][keys]
              };

              _arr.push(_obj);
            }
            ;
            this.imgList = _arr;
            // this.orderInfo = res['data'];
          } else {
            this.msg.error("获取资料信息失败" + res['message']);
          }
          ;
        }
      )
  };
  imgUrl : string ;
  makeLook(idx , url ) {

  };

  dealRecord: object[];

  getDealRecord() {
    let id = this.checkInfo['id'];
    this.orderSer.getDealRecord(id)
      .subscribe(
        res => {
          if (res['success'] == true) {
            this.dealRecord = res['data'];
          } else {
            this.msg.error("获取处理记录出错,原因:" + res['msg']);
          }
        }
      )
  }

  antiFraudObj: object;

  getAntiFraudObj() {
    let clientId = this.checkInfo['customerId'];
    this.orderSer.getAntiFraud(clientId)
      .subscribe(
        res => {
          if (res['success'] == true) {
            this.antiFraudObj = res['data'];
            if(res['data']){
              this.antiFraudObj['resultDescString'] = JSON.parse(this.antiFraudObj['resultDescString']);
              this.tableData['data'] = this.antiFraudObj['resultDescString']['ANTIFRAUD']['risk_items']; 
            };
          } else {
            this.msg.error("获取反欺诈信息出错,原因:" + res['msg'])
          }
        }
      )
  };

  makeCheck(){
      let orderId = this.checkInfo['id'];

      if(this.orderState == 2){
        this.router.navigate(["/workbench/dataRemake", orderId]);
      };

      if(this.orderState == 4){
        this.router.navigate(['/workbench/approveOrder' , orderId]);
      };

      if(this.orderState == 5){
        this.router.navigate(['/workbench/reApproveOrder' , orderId]);
      };

      if(this.orderState == 6){
        this.router.navigate(['/workbench/finalCheck' , orderId]);
      };

      if(this.orderState == 7){
        this.sgo.set("orderInfo" , this.checkInfo) ;
        this.router.navigate(["/workbench/income"]);
      };

      if(this.orderState == 8){
        this.router.navigate(['/workbench/usrVerify' , orderId]);
      };

      if(this.orderState == 9){
        this.router.navigate(['/workbench/profileTrans' ,orderId]);
      };

      if(this.orderState == 10){
        this.router.navigate(['/workbench/makeLoan' , orderId]);
      };
  };
  backNode : object[] = [] ;
  orderBack : boolean  = false ;
  reBack(){

    let _arr  ;
    if(this.orderState == 4){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"}
      ];
    };

    if(this.orderState == 5){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"},
        {"value" : '4' ,'name' : "初审阶段"}
      ]
    };

    if(this.orderState == 6){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"},
        {"value" : '4' ,'name' : "初审阶段"},
        {"value" : '5' ,'name' : "复审阶段"}
      ]
    };
    
    if(this.orderState == 7){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"},
        {"value" : '4' ,'name' : "初审阶段"}
      ]
    };

    if(this.orderState == 8){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"},
        {"value" : '4' ,'name' : "初审阶段"},
        {"value" : '5' ,'name' : "复审阶段"},
        {"value" : '6' ,'name' : "终审阶段"}
      ]
    };

    if(this.orderState == 9){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"},
        {"value" : '4' ,'name' : "初审阶段"},
        {"value" : '5' ,'name' : "复审阶段"},
        {"value" : '6' ,'name' : "终审阶段"},
        {"value" : '8' ,'name' : "客户确认阶段"}
      ]
    };
    
    if(this.orderState == 10){
      _arr = [
        {"value" : '2' ,'name' : "补录阶段"},
        {"value" : '4' ,'name' : "初审阶段"},
        {"value" : '5' ,'name' : "复审阶段"},
        {"value" : '6' ,'name' : "终审阶段"},
        {"value" : '8' ,'name' : "客户确认阶段"},
        {"value" : '9' ,'name' : "资料移交阶段"}
      ]
    }
    this.backNode = _arr ;
		this.orderBack = true ;
  };

  backSure(){
		let id = this.orderInfo['orderVO']['id'] ;
		let postData = this.bakckForm.value ;
		postData['orderStatus'] = this.orderInfo['orderVO']['status'] ;
		this.orderSer.orderBack(id,postData)
			.subscribe(
				res => {
					if(res['success'] == true){
            this.msg.success("操作成功") ;
            window.history.back() ;
						// this.get() ;
						// this.orderBack = false ; 
					}else{
						this.msg.error('操作失败,原因:' +res['msg']);
					};
				}
			)
  };

  cancelModel : boolean = false ;
  usrChanel(){
    this.cancelModel = true ;
  };

   cancel(){
    let id = this.orderInfo['orderVO']['id'] ;
    this.workSer.cancel(id)
      .subscribe(
        res => {
          if(res['success'] == true){
            this.cancelModel = false ;
            this.msg.notifySuccess("操作成功",'该订单已标记为客户取消');
            window.history.back() ;
          }else{
            this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
          };
        }
      )
  };

  lock(){
    let id = this.orderInfo['orderVO']['id'] ;
    this.orderSer.lock(id)
      .subscribe(
        res => {
          if(res['success'] == true){
            this.msg.success("操作成功") ;
          }else{
            this.msg.error("操纵失败,原因:" + res['msg']) ;
          }
        }
      )
  };
  unlock(){
    let id = this.orderInfo['orderVO']['id'] ;
    this.orderSer.unlock(id)
      .subscribe(
        res => {
          if(res['success'] == true){
            this.msg.success("操作成功") ;
          }else{
            this.msg.error("操纵失败,原因:" + res['msg']) ;
          }
        }
      )
  }
  buttonPermission : string[] = [] ;
  bakckForm : FormGroup ;
  getButtonPermission(){
    let menuId = this.menu.getMenuIdByState(this.orderState) ;
    this.menuRemote.getButton(menuId)
      .subscribe(
        res => {
          if(res['success'] == true){
            if(res['data']){
              res['data'].forEach (item => {
                this.buttonPermission.push(item.id) ;
              })
            }
          }else{
            this.msg.error("获取权限按钮失败,原因:" + res['msg']) ;
          }
          console.log(res) ;
        }
      )
  };
  tableData: Object = {
    showIndex: false,
    tableTitle: [
      {name: "规则名称", type: "text", reflect: "risk_name"},
      {name: "分数", type: "text", reflect: "score"},
      {
        name: "意见", type: "text", reflect: "decision", filter: (val) => {
          return decisionFormat(val['decision']);
        }
      },
    ],
    data: [],
  };
  passModel : boolean = false ;

  pass():void {
    let id = this.orderInfo['orderVO']['id'] ;
    let obj = {
      orderStatus:this.orderInfo['orderVO']['status'] ,
      opinion : "" 
    }
    this.workSer.pass(id , obj)
      .subscribe(
        res => {
          if(res['success'] == true){
            this.passModel = false ;
            this.msg.notifySuccess("操作成功" , '该订单已通过预审');
            window.history.back() ;

            // this.get() ;
          }else{
            this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
          };
        }
      )
  };
  refuseModel : boolean = false ;

  refuse(){
    let id = this.orderInfo['orderVO']['id'] ;
    let obj = this.validateForm.value ; 
    obj['orderId'] = id ;
    this.workSer.refuse(obj)
      .subscribe(
        res => {
          if(res['success'] == true){
            this.refuseModel = false ;
            this.msg.notifySuccess("操作成功" , '该订单已拒绝');
            // this.getList();
            window.history.back() ;
          }else{
            this.msg.notifyErr("操作失败",'请检测网络是否连接正常') ;
          };
        }
      )
  };

};

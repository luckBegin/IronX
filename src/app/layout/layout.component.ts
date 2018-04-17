import { Component, OnInit } from '@angular/core' ;
import { MenuService } from '../service/menu/menu.service' ;
import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { SessionStorageService } from '../service/storage/session_storage'
import { MsgService } from '../service/msg/msg.service'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'] ,
})
export class LayoutComponent implements OnInit {

    constructor(
      private s_menu : MenuService,
      private router : Router ,
      private sgo : SessionStorageService ,
      private msg : MsgService
    ){
      router.events.subscribe(evt => {
            if (!this.isFetch && evt instanceof NavigationStart) {
                this.isFetch = true;
            }
            if (evt instanceof NavigationError) {
                this.togleSwitch = false;
                return;
            };
            setTimeout( () :void => {
              this.isFetch = false ;
            },1000)
      })
    }

    ngOnInit(){

      let menu_arr = [1,2,3,4,5,6,7,8,9] ;
      this.menuList = this.s_menu.getMenu(menu_arr) ;
      this.sideMenu = this.menuList[0]['data'] ;

      this.loginInfo = this.sgo.get("loginInfo") ;
    };

    menuList : any[] ;

    sideMenu : any[] ;

    togleSwitch : boolean = false ; 

    isFetch : boolean = false ; 

    logoImg : string = './assets//img/logo.png' ;

    tabIndex : number = 0 ;

    switchTogle : Function = () : void  => {
    	this.togleSwitch  = !this.togleSwitch ;
    };

    selectMenu( type ,data , index){
      if(index != this.tabIndex && type == 'menu'){
        this.tabIndex = index ;
        this.sideMenu = data.data ;
      };

      if(type == 'dropdown'){
        this.router.navigate([data.url]) ;
      }
    };

    changeImg( url : string , idx : number ){
      let el = document.querySelector(".wraperContainer");

      this.activeIndex = idx ;

      let imgUrl = "../assets/img/" + url;

      el['style'].background = `url(${imgUrl}) round` ;

    };
    activeIndex : number = 1 ;

    makeSet(type : string){
      let el = document.querySelector(".theme");

      if(type == 'show'){
        el['style'].right = 0 + 'px'
      }else{
        el['style'].right = "-350px" ;
      };
    };

    loginInfo : object ;

    logOut : Function = () => {
      this.sgo.remove(['loginInfo']) ;
      this.msg.notifySuccess("操作成功","当前用户已推出登陆") ;
      this.router.navigate(['/login']) ;
    };
};
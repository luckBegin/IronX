import { Component, OnInit } from '@angular/core' ;
import { MenuService } from '../service/menu/menu.service' ;
import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'] ,
})
export class LayoutComponent implements OnInit {

    constructor(
      private s_menu : MenuService,
      private router : Router
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
}

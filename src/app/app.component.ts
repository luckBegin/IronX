import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { routeAnimation } from './routes/aniamtion'
@Component({
  selector: 'app-root',
  template: `<div style='width:100%;height:100%;position:relative;' >
  	<router-outlet style='width:100%;height:100%'></router-outlet>
  </div>`,
  styles : [``],
  animations : [routeAnimation]
})
export class AppComponent {
	routerState:boolean = true;
    routerStateCode:string = 'active';
    constructor(private router:Router){
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
          // 每次路由跳转改变状态
          this.routerState = !this.routerState;
          this.routerStateCode = this.routerState ? 'active' : 'inactive';
          }
        });
    }
};
// [@routeAnimation]="routerStateCode"
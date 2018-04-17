import { Component } from '@angular/core';
import { routeAnimation } from './routes/router-animation';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `<div [@routeAnimation]="routerStateCode" style='width:100%;height:100%'>
  	<router-outlet></router-outlet>
  </div>`,
  styles : [``] ,
  animations : [routeAnimation]
})
export class AppComponent {
	routerState:boolean = true;
	routerStateCode:string = 'active';
	constructor(private router:Router){
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.routerState = !this.routerState;
				this.routerStateCode = this.routerState ? 'active' : 'inactive';
			};
		});
	}
};
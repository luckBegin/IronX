import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component' ;
import { LoginComponent } from '../login/login.component';
import { RouteguardService } from './route-guard'
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children : [
        	{
        		path : "workbench" ,
        		loadChildren : 'app/workbench/workbench.module#WorkbenchModule'
        	},{
                path : "usr" , 
                loadChildren : "app/usr/usr.module#UsrModule"
            },{
                path : "product" , 
                loadChildren : "app/product/product.module#ProductModule"
            }
        ],
        canActivate : [RouteguardService]
    },{
        path : "login" ,
        component : LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers : [RouteguardService]
  })
export class RouteRoutingModule { }

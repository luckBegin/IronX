import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component' ;
import { LoginComponent } from '../login/login.component';
import { RouteguardService } from './route-guard';
import { ErrorPageComponent } from './errorPage.component'
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
            },{
                path : "permission" ,
                loadChildren : "app/permission/permission.module#PermissionModule"
            },{
                path : 'financial' , 
                loadChildren : "app/financial/financial.module#FinancialModule"
            },{
                path : "afterLoan" ,
                loadChildren : "app/afterLoan/afterLoan.module#AfterLoanModule"
            },{
                path : 'tools' , 
                loadChildren : "app/tools/tools.module#ToolsModule"
            }
        ],
        canActivate : [RouteguardService]
    },{
        path : "login" ,
        component : LoginComponent
    },{
        path : "error/:code" ,
        component : ErrorPageComponent
    }
];

@NgModule({
    declarations : [ErrorPageComponent] ,
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers : [RouteguardService]
  })
export class RouteRoutingModule { }

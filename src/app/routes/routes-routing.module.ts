import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component' 
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children : [
        	{
        		path : "workbench" ,
        		loadChildren : 'app/workbench/workbench.module#WorkbenchModule'
        	}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class RouteRoutingModule { }

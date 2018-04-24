import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { IntoComponent } from './into/into.component' ;
import { AllComponent } from './all/all.component' ;
import { PrecheckComponent } from './precheck/precheck.component';
import { DataRemakeComponent } from './dataRemake/dataRemake.component';
import { FirstComponent } from './review/first/first.component' ;
import { CheckComponent } from './review/check/check.component';
import { ApproveComponent } from './review/approve/approve.component' ;
import { ManageComponent } from './manage/manage.component';
const compoents = [
	IntoComponent ,
	AllComponent,
	PrecheckComponent,
	DataRemakeComponent,
	FirstComponent ,
	CheckComponent ,
	ApproveComponent ,
	ManageComponent
];

const routes  : Routes = [
	{
		path  : "into" ,
		component : IntoComponent
	},{
		path  : "all/:type" ,
		component : AllComponent
	},{
		path : 'precheck' ,
		component : PrecheckComponent
	},{
		path : "dataRemake/:id" ,
		component : DataRemakeComponent
	},{
		path : "approve",
		children : [
			{
				path : "first" ,
				component : FirstComponent
			}
		]
	},{
		path : "check/:id" ,
		component : CheckComponent
	},{
		path : "approveOrder/:id" , 
		component : ApproveComponent
	},{
		path : "manage" ,
		component : ManageComponent
	}
];
@NgModule({
	declarations: [
		...compoents
	],
	imports: [
		ShareModule,
		NgZorroAntdModule,
		RouterModule.forChild(routes)
	],
	providers: [],
	bootstrap: []
})
export class WorkbenchModule { }
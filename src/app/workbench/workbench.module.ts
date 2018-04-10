import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { IntoComponent } from './into/into.component' ;
import { AllComponent } from './all/all.component' ;
import { PrecheckComponent } from './precheck/precheck.component';
import { DataRemakeComponent } from './dataRemake/dataRemake.component';

const compoents = [
	IntoComponent ,
	AllComponent,
	PrecheckComponent,
	DataRemakeComponent
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
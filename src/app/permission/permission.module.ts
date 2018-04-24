import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { PersonalComponent } from './personal/personal.component' ;
import { OrgComponent } from './org/org.component'
const compoents = [
	PersonalComponent ,
	OrgComponent
];

const routes  : Routes = [
	{
		path : "personal" , 
		component : PersonalComponent
	},{
		path : "org" ,
		component : OrgComponent
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
export class PermissionModule { }
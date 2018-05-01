import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { RepayComponent } from './repay/repay.component' ;
import { CollectComponent } from './collect/collect.component'
import { SueComponent } from './sue/sue.component'
import { HasSueComponent } from './hasSue/hasSue.component'
import { MadeSueComponent } from './madeSue/madeSue.component'
const compoents = [
	RepayComponent ,
	CollectComponent,
	SueComponent ,
	HasSueComponent,
	MadeSueComponent
];

const routes  : Routes = [
	{
		path : "repay" ,
		component : RepayComponent
	},{
		path : "collect" ,
		component : CollectComponent
	},{
		path : 'sue' , 
		component : SueComponent 
	},{
		path : "hasSue" , 
		component : HasSueComponent
	},{
		path : "madeSue" , 
		component : MadeSueComponent
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
export class AfterLoanModule { }
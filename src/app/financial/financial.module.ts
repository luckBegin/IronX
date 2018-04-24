import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { RecheckComponent } from './recheck/recheck.component'
import { GetComponent } from './get/get.component'
import { LoanComponent } from './loan/loan.component'
const compoents = [
	RecheckComponent,
	GetComponent,
	LoanComponent
];

const routes  : Routes = [
	{
		path :"get" ,
		component :GetComponent
	},{
		path :"loan" ,
		component : LoanComponent
	},{
		path : "recheck" , 
		component :RecheckComponent
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
export class FinancialModule { }
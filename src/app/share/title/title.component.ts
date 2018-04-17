import { Component , Input } from '@angular/core' ;

@Component({
	selector : "app-title" ,
	template : `
		<div>
			<span>
				{{title}}
			</span>
			<i class="anticon anticon-close"></i>
		</div>
	` ,
	styles : ['']
})
export class HeaderTitleComponent{
	@Input()
		title : string ;
};
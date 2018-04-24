import { Component ,OnInit } from '@angular/core' ;
import { WorkbenchAll } from '../../service/workbench/all.service';
import { MsgService } from '../../service/msg/msg.service' ;
import { dataFormat } from '../../format/dateFormat' ;
import { FormBuilder,FormGroup,Validators , FormControl } from '@angular/forms';
import { EmitService } from '../../service/event-emit.service' ;
@Component({
	selector : "app-into" ,
	templateUrl : './into.component.html' ,
	styleUrls : ['./into.component.less'] ,
})
export class IntoComponent implements OnInit{
	constructor(
		private allSer : WorkbenchAll ,
		private fb : FormBuilder ,
		private msg : MsgService ,
		private emit : EmitService
	){} ;
	ngOnInit(){
		this.validateForm = this.fb.group({
			"userName" : [null , [Validators.required]] ,
			"phoneNumber" : [null , [Validators.required]] ,
			"idCard" : [null , [Validators.required]]
		});

		this.emit.eventEmit.emit({
			type : "title" ,
			title : "开始进件" ,
			url : "/workbench/into"
		});
	};

	validateForm : FormGroup ;

	submitForm(){
		let data = this.validateForm.value ;
		this.allSer.submitInto(data)
			.subscribe(
				res => {
					if(res['success'] == true){
						this.msg.success("提交成功") ;
						this.validateForm.reset() ;
					}else{
						this.msg.error("提交失败,原因:" + res['msg']) ;
					};
				}
			)
	}
};
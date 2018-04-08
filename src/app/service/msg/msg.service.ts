import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core' ;

@Injectable()
export class MsgService{
	constructor(
		private msg : NzMessageService
	){};

	warn(msg : string) : void {
		this.msg.create("warning" , msg) ;
	};

	error(msg : string) : void {
		this.msg.create("error" , msg) ;
	};

	success(msg : string) : void {
		this.msg.create("success" , msg );
	}
};
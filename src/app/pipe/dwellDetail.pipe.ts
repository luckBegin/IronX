import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo" ;

@Pipe({
  name: 'dwellDetail'
})
export class dwellDetailPipe implements PipeTransform {
  transform(value: any , detail : string): any {
  	let map = {
		"0": "自建",
		"1": "自购无按揭",
		"2": "按揭",
		"3": "租用",
		"4": "亲属住房",
		"5": "单位住房"
  	};
  	let val = map[value];
  	if(detail)
  		val += detail + "层";
    return val ;
  };
}
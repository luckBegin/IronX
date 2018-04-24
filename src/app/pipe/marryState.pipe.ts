import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo"
@Pipe({
  name: 'marriageState'
})
export class MarriageStatePipe implements PipeTransform {
  transform(value: any): any {
  	let map = {
		"0": "已婚",
		"1": "离婚",
		"2": "孀居",
		"3": "单身"
  	}
    let val = map[value]? map[value] : "未知" ;
    return val ;
  };
}
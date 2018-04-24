import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo"
@Pipe({
name: 'edu'
})
export class EduPipe implements PipeTransform {
  transform(value: any): any {
  	let map = {
		"0": "高中/职专及以下",
		"1": "大学专科",
		"2": "大学本科",
		"3": "研究生及以上"
  	}
    let val = map[value]? map[value] : "未知" ;
    return val ;
  };
}
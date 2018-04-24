import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo"
@Pipe({
  name: 'unitNature'
})
export class unitNaturePipe implements PipeTransform {
  transform(value: any): any {
  	let map = {
		"0": "个体",
		"1": "私营",
		"2": "国企",
		"3": "合资"
  	};
  	let val = map[value]? map[value] : "未知" ;
    return val ;
  };
}
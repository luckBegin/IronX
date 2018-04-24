import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo" ;

@Pipe({
  name: 'relation'
})
export class RelationPipe implements PipeTransform {
  transform(value: any): any {
  	let map = {
		"0": "父母",
		"1": "子女",
		"2": "配偶",
		"3": "兄弟姐妹",
		"4": "亲戚",
		"5": "朋友",
		"6": "同学",
		"7": "同事",
		"8": "其他"
  	};
  	let val = map[value];
    return val ;
  };
}
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'GenderPipe'
})
export class GenderPipe implements PipeTransform {
  transform(value: any): any {
    let map = {
      "M": "男",
      "F": "女"
    };
    let val = map[value] ? map[value] : "无法解析";
    return val;
  };
}

import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo"
@Pipe({
  name: 'SexByNumner'
})
export class SexByNumnerPipe implements PipeTransform {
  transform(value: any): any {
    let sex = value == 1 ? "女" : "男";
    return sex ;
  };
}
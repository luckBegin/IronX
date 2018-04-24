import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo";
import { dataFormat } from '../format/dateFormat'
@Pipe({
  name: 'dateFormat'
})
export class dateFormatPipe implements PipeTransform {
  transform(value: any , format : string): any {
  	return dataFormat(value , format);
  };
}
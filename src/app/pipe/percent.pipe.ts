import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo"
@Pipe({
name: 'PercentPipe'
})
export class PercentPipe implements PipeTransform {
  transform(value: any): any {
    return value * 100 ;
  };
}
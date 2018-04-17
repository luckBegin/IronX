import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo";

@Pipe({
  name: 'SexById'
})
export class SexByIdPipe implements PipeTransform {
  transform(value: any): any {
    return idCardInfo.getSex(value) ;
  };
}
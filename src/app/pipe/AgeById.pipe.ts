import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo"
@Pipe({
  name: 'AgeById'
})
export class AgeByIdPipe implements PipeTransform {
  transform(value: any): any {
    return idCardInfo.getAge(value) ;
  };
}
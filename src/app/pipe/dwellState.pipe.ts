import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo" ;

@Pipe({
  name: 'dwellState'
})
export class DwellStatePipe implements PipeTransform {
  transform(value: any): any {
    let val = value == 0 ? "无":"有" ;
    return val ;
  };
}
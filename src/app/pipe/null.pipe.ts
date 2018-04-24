import { Pipe, PipeTransform } from '@angular/core';
import { idCardInfo } from "../format/idCardInfo" ;

@Pipe({
  name: 'nullPipe'
})
export class nullPipe implements PipeTransform {
  transform(value: any): any {
  	if(value)
  		return value
  	else
  		return "- -" ;
  };
}
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FinalDecisionResult'
})
export class FinalDecisionResultPipe implements PipeTransform {
  transform(value: any): any {
    let _map = {
      PASS: "通过",
      REVIEW: "复核",
      REJECT: "拒绝"
    };
    let val = _map[value];
    return val ? val : "无法解析";
  };
}

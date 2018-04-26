import { FormControl } from '@angular/forms' ;
export const CommonValidator = {
    isNumber(control : FormControl){
        let val = control.value;
        return (val % 6 == 0)?null: { "invalid" : true } ;
    },
    isChinese(control : FormControl){
        let val = control.value ;
        let reg = /^[\u4e00-\u9fa5]{0,}$/g ;
        return (reg.test(val)) ? null :  { "invalid" : true } ;
    },
    isIdCard(control : FormControl){
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        let val = control.value ;
        return (reg.test(val)) ? null : {"invalid" : true } ;
    },
    
}
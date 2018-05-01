import { FormControl } from '@angular/forms' ;
export const CommonValidator = {
    isNumber(control : FormControl){
        let val = control.value;
        let reg = /^[0-9]*$/g ;
        return (reg.test(val)) ? null :  { "invalid" : true } ;
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
    passiveNumber(control : FormControl){
        let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/g;
        let val = control.value ;
        return (reg.test(val)) ? null : {"invalid" : true } ;
    },
    isSite(control : FormControl){
        let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        let val = control.value ;
        return (reg.test(val)) ? null : {"invalid" : true } ;
    }
}
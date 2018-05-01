export const ObjToQueryString = function(obj : object) : string {
    let str = '';
    for(let keys in obj){
        if(obj[keys] != null || obj[keys] != 'null' || obj[keys] != 'undefined')
            str += keys + "=" + obj[keys] + "&";
    }
    return str ;
};
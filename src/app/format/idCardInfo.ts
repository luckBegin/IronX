import { dataFormat } from './dateFormat'
const getSex = ( idCard : string ) => {
    if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
    return "男";
    } else {
    return "女";
    }
};

const getAge = ( idCard : string) => {
	var len = (idCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))
        {
            return 0;
        };
    };
    var strBirthday = "";
    {
        strBirthday = idCard.substr(6, 4) + "/" + idCard.substr(10, 2) + "/" + idCard.substr(12, 2);
    };
    if (len == 15) {
        strBirthday = "19" + idCard.substr(6, 2) + "/" + idCard.substr(8, 2) + "/" + idCard.substr(10, 2);
    };
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
const getBirth = ( idCard : string) => {
    var len = (idCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))
        {
            return 0;
        };
    };
    var strBirthday = "";
    {
        strBirthday = idCard.substr(6, 4) + "-" + idCard.substr(10, 2) + "-" + idCard.substr(12, 2);
    };
    if (len == 15) {
        strBirthday = "19" + idCard.substr(6, 2) + "-" + idCard.substr(8, 2) + "-" + idCard.substr(10, 2);
    };

    return strBirthday ;
}
export const idCardInfo = {
	getSex : getSex ,
	getAge : getAge ,
    getBirth : getBirth
}
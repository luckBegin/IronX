import { ContactModel } from './contact.model';
export class PostDataModel {
	applyOrderVO : object = {
		applyMoney : '' ,
		deadline: '' ,
		id : '' ,
		payBackType : '' ,
		productId : '' ,
		status : '' ,
		use : '' ,
		useNature: '' ,
	};

	clientContactInputVOS : ContactModel[] = [] ;
	// options
	clientInfoInputVO : object = {
		birthDate : "" ,
		currentAddress : "",
		dwellDetail : "" ,
		dwellState : "" ,
		educationDegree : ""
		// gender (integer, optional): 客户性别,参考接口: /client/enum/gender ,
		// id (integer, optional): 主键id ,
		// idCard (string, optional): 身份证号 ,
		// localHouse (integer, optional): 有无本地房产,参考接口: /client/enum/boolean ,
		// marriageState (integer, optional): 婚姻状况,参考接口: /client/enum/marry ,
		// monthlyIncome (string, optional): 月收入 ,
		// phoneNumber (string, optional): 手机号码 ,
		// registerCity (string, optional): 户籍城市 ,
		// registerCounty (string, optional): 户籍县/区 ,
		// registerDetailAddress (string, optional): 户籍地址 ,
		// registerProvince (string, optional): 户籍省份 ,
		// userName (string, optional): 客户姓名
	};
	clientUnitInputVO : object = {

	};
}
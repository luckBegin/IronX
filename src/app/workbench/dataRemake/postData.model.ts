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
		educationDegree : "",
		gender : "" ,
		idCard : "" ,
		localHouse : "",
		// id (integer, optional): 主键id ,
		marriageState : "" ,
		monthlyIncome : "" ,
		phoneNumber : "" ,
		registerProvince : "" ,
		registerCity : "",
		registerCounty : "" ,
		registerDetailAddress : "",
		userName : "" ,
	};
	clientUnitInputVO : object = {
		currentUnitAddress : "",
		currentUnitEntryDate : "" ,
		currentUnitWorkYears : "" ,
		department : "" ,
		// id (integer, optional): 主键id ,
		jobPosition : "" ,
		jobType : "" ,
		// salaryGrantForm (string): 工资发放形式 ,
		// unitName (string): 单位名称 ,
		// unitNature (string): 单位性质 ,
		// unitPhone (string): 单位电话 ,
		// userId (integer): 客户id
	};
}
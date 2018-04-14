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
		jobPosition : "" ,
		jobType : "" ,
		salaryGrantForm : "" ,
		unitName : "" ,
		unitNature : "" ,
		unitPhone : "" ,
		userId : "",
		id : "" ,
	};
}
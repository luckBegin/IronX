const host = 'http://151.28ms.com:8088' ;

const workbench = {
	orderList : host + '/order/getStatus' ,
	orderType : host + "/order/undisposedOrders" ,
	userManager : host + "/system/user/getAllCustomerManager" ,
	orderStatus : host + "/order/orderStatus" ,
	dealUserList : host + "/system/user/getOperatorManager" ,
	pass : host + "/flow/confirm2NextStatus/",
	refuse : host + "/flow/refuseStatus/" ,
	cancel : host + "/flow/cancelOrder/" ,
	orderInfo : host + "/order/detail/" ,
	postClient : host + "/client/collection" ,
};

const depart = {
	departList : host + "/department/getTree" ,
};

const product = {
	productList : host + "/config/products" ,
};

const enums = {
	sex : host + "/client/enum/gender",
	marry :host + "/client/enum/marry",
	edu : host +"/client/enum/education" ,
	live : host + "/client/enum/dwell" ,
	unit : host + "/client/enum/unit" ,
	relation : host + "/client/enum/contact/relation",
	loan_type : host + "/enum/loan/nature" ,
	loan_useWay : host + "/enum/loan/use" ,
	loan_purpose: host + "/dueDiligence/enum/loanPurpose" ,
	repay_way : host + "/enum/repaymentPlan/source",
	repay_status : host + "/enum/repaymentPlan/status",
	imgUploadType : host + "/order/ordersource/baseType"
};

const upload = {
	baseUpload : host + "/order/ordersource/baseUpload",
	delImg : host + "/order/ordersource/delete/"
}
export const GLOBAL = {
	API : {
		workbench : workbench ,
		depart : depart ,
		product : product ,
		enum : enums,
		upload : upload
	}
}
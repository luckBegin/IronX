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
	relation : host + "/client/enum/contact/relation" 
};
export const GLOBAL = {
	API : {
		workbench : workbench ,
		depart : depart ,
		product : product ,
		enum : enums
	}
}
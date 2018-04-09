const host = 'http://151.28ms.com:8088' ;

const workbench = {
	orderList : host + '/order/getStatus' ,
	orderType : host + "/order/undisposedOrders" ,
	userManager : host + "/system/user/getAllCustomerManager"
};

const depart = {
	departList : host + "/department/getTree" ,
};

const product = {
	productList : host + "/config/products" ,
}
export const GLOBAL = {
	API : {
		workbench : workbench ,
		depart : depart ,
		product : product
	}
}
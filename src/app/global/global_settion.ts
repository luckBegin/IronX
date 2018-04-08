const host = 'http://151.28ms.com:8088' ;

const workbench = {
	orderList : host + '/order/getStatus' ,
	orderType : host + "/order/undisposedOrders"
}
export const GLOBAL = {
	API : {
		workbench : workbench
	}
}
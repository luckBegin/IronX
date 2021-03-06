const host = 'http://151.28ms.com:8189' ;
// const host = 'http://151.28ms.com:8088' ;
// const host = 'http://192.168.0.122:8083' ;
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
	into : host + "/order/into/applyOrder" ,
};

const depart = {
	departList : host + "/department/getTree" ,
	addDepart : host + "/department/add" ,
	deleteDepart : host + "/department/delete/" ,
	editDepart : host + "/department/update/"
};

const product = {
	productList : host + "/config/products" ,
	create : host + "/config/product" ,
	delete : host + "/config/product/" ,
	edit : host + "/config/product"
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
};

const usr = {
	getUsrList : host + "/client/clients" ,
	getQueryPara : host + "/client/clients/params" ,
	getLoginUser : host + "/system/user/loginUser" ,
	changePass : host + "/system/user/resetPassword/" ,
	stuffList : host + "/system/user/find" ,
	addStuff : host + "/system/user/add" ,
	freeze : host + "/system/user/freeze/" ,
	unFreeze : host + "/system/user/unfreeze/" ,
	getAllDue : host + "/system/user/getAllDueDiligenceManager" ,
};
const order = {
	getImg : host + "/order/ordersource/base/" ,
	dealRecord : host + "/order/orderOperatorRecord/" ,
	telRecord : host + "/audit/phoneAudit/record/" ,
	addTelRecord : host + "/audit/phoneAudit/record" ,
	telCheckRecord : host + "/audit/phoneAudit" ,
	saveReport : host + "/audit/creditReport/" ,
	saveFirstCheck : host + "/flow/saveFirstCheck",
	getFirestCheclRst : host + "/flow/getFirstCheck/" ,
    getAntiFraud: host + "/audit/td/anti/fraud/",
	saveSecondCheck:host + "/flow/saveSecoundCheck" ,
	getSecondCheckRst : host + "/flow/getSecoundCheck/",
	getFirstImg : host + "/order/ordersource/firstcheck/" ,
	telResult :host + "/audit/phoneAudit/" ,
	verify :host + "/flow/confirm2NextStatus/" ,
	allImg : host  + "/order/ordersource/",
	postReport : host + "/dueDiligence" ,
	lastCheck : host + "/flow/saveLastCheck" ,
	makeLoan : host + "/flow/confirm/loan/" ,
	orderBack : host +"/flow/unConfirmRollbackStatus/" ,
	lock : host + "/order/lock/" ,
	unlock : host + "/order/unlock/" ,
	delTelRecord : host + "/audit/phoneAudit/record/"
}
const role = {
	getRoleList : host + "/system/role/getAllRole" ,
	delRole : host + "" ,
	editRole : host + "/system/role/update" ,
};
const financial = {
	getRecheck : host + "/manage/financial/repayments/nonePay" ,
	verify : host + "/manage/financial/confirm/" ,
	loanList : host + "/manage/financial/repayments/alreadyPay"
};

const afterLoan = {
	getList : host + "/loanAfter/repaymentManage" ,
	deleteOrder : host + "/loanAfter/repaymentPlan/",
	uploadExcel : host + "/loanAfter/repaymentPlan/import" ,
	exportExcel : host + "/loanAfter/repaymentManage/export" ,
	addRecord : host + "/loanAfter/repaymentPlan" ,
	getCollect :host + "/loanAfter/chaseDebt" ,
	exportCollect : host  + "/loanAfter/chaseDebt/export" ,
	sued : host + "/loanAfter/chaseDebt/prosecute/",
	sueList : host + "/loanAfter/prosecute" ,
	sueExcel :host + "/loanAfter/prosecute/export",
	makeSue : host + "/loanAfter/prosecute/operate/" ,
}
const download = {
	img : host + "/order/output/toZip/"
}
const tool = {
	clac : host + "/application/tool/interest" ,
	siteList : host + "/application/tool/webSites" ,

	delSite : host +"/application/tool/webSite/" ,
	createSite :host + "/application/tool/webSite" ,
};
const menu = {
	getAllMenu : host + "/system/menu/getAllMenuTree" ,
	roleMenu : host + "/system/menu/getMenusByRoles" ,
	getButtonList : host + "/system/menu/getButtonByMenu/" ,
	slefMenu : host + "/system/menu/getAllMenuTree" ,
};
export const GLOBAL = {
	API : {
		workbench : workbench ,
		depart : depart ,
		product : product ,
		enum : enums,
		upload : upload ,
		login : host + "/login_user" ,
		usr : usr ,
		order : order ,
		role : role ,
		financial: financial ,
		afterLoan : afterLoan,
		download : download,
		tool : tool ,
		menu : menu 
	}
}

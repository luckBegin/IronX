export const dataFormat = ( timeStamp : string  , format : string = 'y-m-d h:i:s') : string =>{
	if(timeStamp){
		let date = new Date(timeStamp) ;

		let _year = date.getFullYear();
		let _month = date.getMonth() + 1 ;
		let _date = date.getDate() ;

		let _hour = date.getHours();
		let _min = date.getMinutes();
		let _sec = date.getSeconds();

		let dateStr = '' ;
		if(format.indexOf("y") > -1){
			dateStr += _year +"-";
		};

		if(format.indexOf("m") > -1){
			let month = _month < 10 ? "0"+_month : _month ;
			dateStr += month +"-";
		};

		if(format.indexOf("d") > -1){
			let date = _date < 10 ? "0"+_date : _date ;
			dateStr += date
		};

		if(format.indexOf("h") > -1){
			let hour = _hour < 10 ? "0"+_hour : _hour ;
			dateStr += " " + hour +":" ;
		};

		if(format.indexOf("i") > -1){
			let min = _min < 10 ? "0"+_min : _min ;
			dateStr += min +":";
		};

		if(format.indexOf("s") > -1){
			let sec = _sec < 10 ? "0"+_sec : _sec ;
			dateStr += sec ;
		};
		
		return dateStr ;
	}else{
		return '暂无' ;
	};
};
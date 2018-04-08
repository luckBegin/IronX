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
			dateStr += _month +"-";
		};

		if(format.indexOf("d") > -1){
			dateStr += _date
		};

		if(format.indexOf("h") > -1){
			dateStr += " " + _hour +":" ;
		};

		if(format.indexOf("i") > -1){
			dateStr += _min +":";
		};

		if(format.indexOf("s") > -1){
			dateStr += _sec ;
		};
		
		return dateStr ;
	}else{
		return '暂无' ;
	};
};
export const DateReflect : Function = ( map : object , data : object[] ) : object[] => {
	let _arr = [] ;
	if(data){
		data.forEach( item => {
			let _obj = {} ;
			for(let keys in map){
				let data_val = item[keys] ;
				if(data_val){
					let output_key = map[keys] 
					_obj[output_key] = data_val ;
				};
			};
			if(isNullObj)
				_arr.push(_obj);
		});
	};
	return _arr ;
};

const isNullObj = function(obj){
	for(let keys in obj)
		return false;
	return true; 
}
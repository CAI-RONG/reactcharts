const reducer=(state=[],action)=>{
	switch(action.type){
		case "CHANGE_COLOR":
			return Object.assign({},state,{color:action.bgc});
		case "TIME_SCALE_FILTER":
			return Object.assign({},state,{filter:action.filter});
		case "DATE_FILTER":
			return Object.assign({},state,{begin:action.begin,end:action.end});
		default:
			return state;
	}
}

export default reducer;
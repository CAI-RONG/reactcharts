const reducer=(state=[],action)=>{
	switch(action.type){
		case "CHANGE_COLOR":
			return Object.assign({},state,{color:action.bgc});
		case "TIME_SCALE_FILTER":
			return Object.assign({},state,{timeScaleFilter:action.filter});
		case "BEGINDATE_FILTER":
			return Object.assign({},state,{beginDate:action.begin});
		case "ENDDATE_FILTER":
			return Object.assign({},state,{endDate:action.end});
		default:
			return state;
	}
}

export default reducer;
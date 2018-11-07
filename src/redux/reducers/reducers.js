const reducer=(state=[],action)=>{
	switch(action.type){
		case "CHANGE_COLOR":
			return Object.assign({},state,{color:action.bgc});
		case "TIME_SCALE_FILTER":
			return Object.assign({},state,{timeScaleFilter:action.filter});
		case "BEGINDATE_FILTER":
			return Object.assign({},state,{beginDate:action.begin.toLocaleDateString()});
		case "ENDDATE_FILTER":
			return Object.assign({},state,{endDate:action.end.toLocaleDateString()});
		default:
			return state;
	}
}

export default reducer;
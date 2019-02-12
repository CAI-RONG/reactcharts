const initial_state={
    timeScaleFilter:'week',
    beginDate:'2018-10-23',
    endDate:'2018-12-01',
    unitFilter:'one',
    duration:'year',
    competitor:'week',
    competitorNumber:1,
    filterOption:'date',
    upperLimit:0,
    lowerLimit:0
}

const filterReducer=(state=initial_state,action)=>{
    switch(action.type){
        case "TIME_SCALE_FILTER":
			return Object.assign({},state,{timeScaleFilter:action.filter});
		case "BEGINDATE_FILTER":
			return Object.assign({},state,{beginDate:action.begin});
		case "ENDDATE_FILTER":
			return Object.assign({},state,{endDate:action.end});
		case "DATA_UNIT_FILTER":
			return Object.assign({},state,{unitFilter:action.filter});
		case "COMPARE_DURATION_FILTER":
			return Object.assign({},state,{duration:action.duration});
		case "COMPARE_COMPETITOR_FILTER":
			return Object.assign({},state,{competitor:action.competitor});
		case "COMPETITOR_NUM_FILTER":
			return Object.assign({},state,{competitorNumber:action.number});
		case "FILTER_OPTION_CHANGE":
			return Object.assign({},state,{filterOption:action.choice});
		case "UPPER_LIMIT_CHANGE":
			return Object.assign({},state,{upperLimit:action.number});
		case "LOWER_LIMIT_CHANGE":
            return Object.assign({},state,{lowerLimit:action.number});
        default:
            return state;
    }
}

export default filterReducer;
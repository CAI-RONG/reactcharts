const initial_state={
    data:[],
    offRoadData:{},
    roadSideData:{},
    subscriptionData:{},
    operatorTransactionData:{},
    pklotTransactionData:{},
    metadata:{
		page:1,
		total_pages:1,
		rows_count:1,
		per_page:5
	}
}

const revenueAnalyticsReducer=(state=initial_state,action)=>{
    switch(action.type){
        case "OFFROAD_DATA_CHANGE":
            return Object.assign({},state,{offRoadData:action.data});
        case "OPERATOR_TRANSACTION_DATA_CHANGE":
            return Object.assign({},state,{operatorTransactionData:action.data});
        case "PKLOT_TRANSACTION_DATA_CHANGE":
            return Object.assign({},state,{pklotTransactionData:action.data});
        default:
            return state;
    }
}

export default revenueAnalyticsReducer;
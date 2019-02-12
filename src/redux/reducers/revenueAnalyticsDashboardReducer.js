const initial_state={
    //data
    data:[],
    metadata:{
		page:1,
		total_pages:1,
		rows_count:1,
		per_page:5
	}
}
//not done yet
const revenueAnalyticsReducer=(state=initial_state,action)=>{
    switch(action.type){
        default:
            return state;
    }
}

export default revenueAnalyticsReducer;
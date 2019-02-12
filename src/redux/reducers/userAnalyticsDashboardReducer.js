import creditCard from '../../data/creditCard.json';
import UserData from '../../data/userStatus.json';

const initial_state={
	userData:UserData.data,
    banks:creditCard.data,
    userDataFirstDay:UserData.data.iosData[0].date,
	userDataLastDay:UserData.data.iosData[UserData.data.iosData.length-1].date,
	testData:{},
	userAnalyticsData:{},
	metadata:{
		page:1,
		total_pages:1,
		rows_count:1,
		per_page:5
	}
}

const userAnalyticsReducer=(state=initial_state,action)=>{
	switch(action.type){
		case "TEST_DATA_CHANGE":
			return Object.assign({},state,{testData:action.data});
		case "UPDATE_METADATA":
			return Object.assign({},state,{
				metadata:{
					page:action.metadata.page,
					total_pages:action.metadata.total_pages,
					rows_count:action.metadata.rows_count,
					per_page:action.metadata.per_page
				}
			});
		case "USER_ANALYTICS_DATA":
			return Object.assign({},state,{userAnalyticsData:action.data});
		default:
			return state;
	}
}

export default userAnalyticsReducer;
import {combineReducers} from 'redux';

import userAnalyticsReducer from './userAnalyticsDashboardReducer';
import revenueAnalyticsReducer from './revenueAnalyticsDashboardReducer';
import filterReducer from './filterReducer';
import authReducer from './userAuthReducer';


export default combineReducers({
	userAnalyticsReducer,
	revenueAnalyticsReducer,
	filterReducer,
	authReducer
});
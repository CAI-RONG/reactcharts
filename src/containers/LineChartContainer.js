import {connect} from 'react-redux';
import LineChart from '../components/LineChart';
import transform from '../utils/dataTransform';
import * as d3 from 'd3';
import $ from 'jquery';
import axios from 'axios';

const mapStateToProp=(state,props)=>{
	var output={}

	function makeData(propName){
		var date=[],iOS=[],Android=[],Total=[];
		if(state.userAnalyticsReducer.userAnalyticsData.iOS){
			date.push(...state.userAnalyticsReducer.userAnalyticsData.iOS.map(
				d=>{
					return (
						d3.timeFormat("%m/%d")(d3.timeParse('%Y-%m-%d')(d.beginDate))
						+'-'+
						d3.timeFormat("%m/%d")(d3.timeParse('%Y-%m-%d')(d.endDate))
					);
				}
			));
			iOS.push(...state.userAnalyticsReducer.userAnalyticsData.iOS.map(d=>d[propName]));
		}
		if(state.userAnalyticsReducer.userAnalyticsData.Android){
			Android.push(...state.userAnalyticsReducer.userAnalyticsData.Android.map(d=>d[propName]));
		}
		if(state.userAnalyticsReducer.userAnalyticsData.iOS && state.userAnalyticsReducer.userAnalyticsData.Android)
			Total.push(...state.userAnalyticsReducer.userAnalyticsData.iOS.map((d,i)=>d[propName]+state.userAnalyticsReducer.userAnalyticsData.Android[i][propName]));
		return {
			'Total':{'date':date,'value':Total},
			'iOS':{'date':date,'value':iOS},
			'Android':{'date':date,'value':Android}
		}
	}

	switch(props.name){
		case 'downloads':
			output=makeData('num_downloads');
			break;
		case 'members':
			output=makeData('num_user');
			break;
		case 'bind':
			output=makeData('num_user_with_lp');
			break;
		case 'subscribe':
			output=makeData('num_user_with_subscription');
			break;
		case 'MAU':
			output=makeData('MAU');
			break;
		case 'WAU':
			output=makeData('WAU');
			break;
		case 'DAU':
			output=makeData('DAU');
			break;
		default:
			output={'none':{'date':[],'value':[]}}
			break;
	}
	
	return {
		data:output,
		name:props.name,
		width:'100%',
		unit:state.unitFilter==='K'?1000:1
	}
}

const LineChartContainer=connect(
	mapStateToProp
)(LineChart);

export default LineChartContainer;
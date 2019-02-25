import {connect} from 'react-redux';
import LineChart from '../components/LineChart';
import transform from '../utils/dataTransform';
import * as d3 from 'd3';

const mapStateToProp=(state,props)=>{
	var output={}

	function makeData(data_source,propName){
		var date=[],iOS=[],Android=[],Total=[];
		if(data_source.iOS){
			date.push(...data_source.iOS.map(
				d=>{
					return (
						d3.timeFormat("%m/%d")(d3.timeParse('%Y-%m-%d')(d.beginDate))
						+'-'+
						d3.timeFormat("%m/%d")(d3.timeParse('%Y-%m-%d')(d.endDate))
					);
				}
			));
			iOS.push(...data_source.iOS.map(d=>d[propName]));
		}
		if(data_source.Android){
			Android.push(...data_source.Android.map(d=>d[propName]));
		}
		if(data_source.iOS && data_source.Android)
			Total.push(...data_source.iOS.map((d,i)=>d[propName]+data_source.Android[i][propName]));
		return {
			'Total':{'date':date,'value':Total},
			'iOS':{'date':date,'value':iOS},
			'Android':{'date':date,'value':Android}
		}
	}

	switch(props.name){
		case 'downloads':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'num_downloads');
			break;
		case 'members':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'num_user');
			break;
		case 'bind':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'num_user_with_lp');
			break;
		case 'subscribe':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'num_user_with_subscription');
			break;
		case 'MAU':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'MAU');
			break;
		case 'WAU':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'WAU');
			break;
		case 'DAU':
			output=makeData(state.userAnalyticsReducer.userAnalyticsData,'DAU');
			break;
		case 'operatorTransaction_qty':
			output=makeData(state.revenueAnalyticsReducer.operatorTransactionData,'current_qty');
			break;
		case 'operatorTransaction_amt':
			output=makeData(state.revenueAnalyticsReducer.operatorTransactionData,'current_amt');
			break;
		case 'pklotTransaction_qty':
			output=makeData(state.revenueAnalyticsReducer.pklotTransactionData[props.pklot],'order_qty');
			for(var d in output){
				output[d].date.reverse();
				output[d].value.reverse();
			}
			break;
		case 'pklotTransaction_amt':
			output=makeData(state.revenueAnalyticsReducer.pklotTransactionData[props.pklot],'order_amt');
			for(var d in output){
				output[d].date.reverse();
				output[d].value.reverse();
			}
			break;
		default:
			output={'none':{'date':[],'value':[]}}
			break;
	}
	
	return {
		data:output,
		name:props.pklot?props.name+'-'+props.pklot:props.name,
		width:'100%',
		unit:state.unitFilter==='K'?1000:1
	}
}

const LineChartContainer=connect(
	mapStateToProp
)(LineChart);

export default LineChartContainer;
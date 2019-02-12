import {connect} from 'react-redux';
import GrowthElement from '../components/Growth/growthElement';
import * as d3 from 'd3';

const mapStateToProp=(state,props)=>{
	var begin=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(new Date()))-86400000*7;//first day of last week
	var end=begin+86400000*6;//last day of last week
	var lastWeekBegin=begin-86400000*7;//first day of last last week
	var lastWeekEnd=lastWeekBegin+86400000*6;//last day of last last week
	var total=0;
	var lastWeekTotal=0;
	
	/*transform value to date */
	begin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(begin));
	end=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(end));
	lastWeekBegin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(lastWeekBegin));
	lastWeekEnd=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(lastWeekEnd));
	
	state.userAnalyticsReducer.userData.iosData.forEach(
		function(data){
			const date=d3.timeParse("%Y-%m-%d")(data.date);
			if(date>=begin && date<=end)
				total+=data[props.name];
			if(date>=lastWeekBegin && date<=lastWeekEnd)
				lastWeekTotal+=data[props.name];
		}
	)
	state.userAnalyticsReducer.userData.androidData.forEach(
		function(data){
			const date=d3.timeParse("%Y-%m-%d")(data.date);
			if(date>=begin && date<=end)
				total+=data[props.name];
			if(date>=lastWeekBegin && date<=lastWeekEnd)
				lastWeekTotal+=data[props.name];
		}
	)
	
	const diff=(total/lastWeekTotal)-1;
	const Icon=(diff>=0)?"arrow-up":"arrow-down";
	const Color=(diff>=0)?"green":"red";
	
	return {
		name:props.name,
		data:total,
		glyph:{
			icon:Icon,
			color:Color
		},
		grow:Math.abs(parseInt(diff*100))
	}
}

const mapDispatchToProp=(dispatch)=>{
	return {}
}

const GrowthElementContainer=connect(
	mapStateToProp,
	mapDispatchToProp
)(GrowthElement);

export default GrowthElementContainer;
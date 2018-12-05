import {connect} from 'react-redux';
import LineChart from '../components/Charts/LineChart/LineChart';
import transform from '../utils/dataTransform';
import * as d3 from 'd3';

const mapStateToProp=(state,props)=>{
	var transformedData=transform(state,props);
	var total={'Total':{'date':[],'value':[]}};
	total.Total.date=transformedData.data.iOS.date.slice();
	total.Total.value=transformedData.data.iOS.value.map(
		function(d,i){
			return d+transformedData.data.Android.value[i];
		}
	);
	var output={};
	output=Object.assign({},total);
	output=Object.assign({},output,transformedData.data);
	
	for(var lines in output){
		output[lines].date.map(
			function(d){
				var currentDate=d3.timeParse("%Y-%m-%d")(d);
				if(props.active){
					switch(props.timeFilter){
						case 'day':
							output[lines].date[output[lines].date.indexOf(d)]=d3.timeFormat("%m/%d")(currentDate);
							break;
						case 'week':
							var firstDayOftheWeek=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(currentDate));
							//var lastDayOftheWeek=new Date(firstDayOftheWeek.getFullYear(),firstDayOftheWeek.getMonth(),firstDayOftheWeek.getDate()+6);
							output[lines].date[output[lines].date.indexOf(d)]=(currentDate>firstDayOftheWeek?d3.timeFormat("%m/%d")(currentDate):d3.timeFormat("%m/%d")(firstDayOftheWeek))+'-'
							+(new Date(firstDayOftheWeek.valueOf()+86400000*6)<=state.endDate?d3.timeFormat("%m/%d")(new Date(firstDayOftheWeek.valueOf()+86400000*6)):d3.timeFormat("%m/%d")(state.endDate));
							break;
						case 'month':
							output[lines].date[output[lines].date.indexOf(d)]=d3.timeFormat("%Y/%m")(currentDate);
							break;
					}
				}
				else{
					switch(state.timeScaleFilter){
						case 'day':
							output[lines].date[output[lines].date.indexOf(d)]=d3.timeFormat("%m/%d")(currentDate);
							break;
						case 'week':
							var firstDayOftheWeek=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(currentDate));
							//var lastDayOftheWeek=new Date(firstDayOftheWeek.getFullYear(),firstDayOftheWeek.getMonth(),firstDayOftheWeek.getDate()+6);
							output[lines].date[output[lines].date.indexOf(d)]=(currentDate>firstDayOftheWeek?d3.timeFormat("%m/%d")(currentDate):d3.timeFormat("%m/%d")(firstDayOftheWeek))+'-'
							+(new Date(firstDayOftheWeek.valueOf()+86400000*6)<=state.endDate?d3.timeFormat("%m/%d")(new Date(firstDayOftheWeek.valueOf()+86400000*6)):d3.timeFormat("%m/%d")(state.endDate));
							break;
						case 'month':
							output[lines].date[output[lines].date.indexOf(d)]=d3.timeFormat("%Y/%m")(currentDate);
							break;
					}
				}
			}
		)
	}
	
	return {
		data:output,
		name:transformedData.name,
		width:'100%'
	};
}

const mapDispatchToProp=dispatch=>{
	return {};
}

const ContainerLineChart=connect(
	mapStateToProp,
	mapDispatchToProp
)(LineChart);

export default ContainerLineChart;
import {connect} from 'react-redux';
import LineChart from '../components/Charts/LineChart/LineChart';
import * as d3 from 'd3';

const mapStateToProp=state=>{
	var download={'iosData':{'date':[],'value':[]},'androidData':{'date':[],'value':[]}};
	
	var selectedData={'ios':state.userData.iosData.slice(),'android':state.userData.androidData.slice()};
	
	var begin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));
	var	end=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.endDate));
	
	if(state.beginDate>state.endDate || state.endDate==undefined)
		end=d3.timeParse("%Y-%m-%d")(state.userData.iosData[state.userData.iosData.length-1].date);
	
	if(state.beginDate){
		var i=0,j=0;
		selectedData.ios.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<begin)i++;}
		)
		selectedData.android.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<begin)j++;}
		)
		selectedData.ios.splice(0,i);
		selectedData.android.splice(0,j);
	}
	if(state.endDate){
		var i=0,j=0;
		selectedData.ios.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>end)i++;}
		)
		selectedData.android.forEach(
			function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>end)j++;}
		)
		selectedData.ios.splice(selectedData.ios.length-i,i);
		selectedData.android.splice(selectedData.android.length-j,j);
	}
	
	switch(state.timeScaleFilter){
		case "day":
			dataParse(d3.timeFormat("%m/%d"));
			break;
		case "week":
			dataParse(d3.timeFormat("%Y-%U"));
			var iosDate=download.iosData.date;
			for(var i=0; i<iosDate.length; ++i){
				var firstDayOftheWeek=d3.timeParse("%Y-%U")(iosDate[i]);
				iosDate[i]=d3.timeFormat("%m/%d")(firstDayOftheWeek);
				firstDayOftheWeek.setDate(firstDayOftheWeek.getDate()+6);
				iosDate[i]=iosDate[i]+d3.timeFormat("-%m/%d")(firstDayOftheWeek);
			}
			var androidDate=download.androidData.date;
			for(var i=0; i<androidDate.length; ++i){
				var firstDayOftheWeek=d3.timeParse("%Y-%U")(androidDate[i]);
				androidDate[i]=d3.timeFormat("%m/%d")(firstDayOftheWeek);
				firstDayOftheWeek.setDate(firstDayOftheWeek.getDate()+6);
				androidDate[i]=androidDate[i]+d3.timeFormat("-%m/%d")(firstDayOftheWeek);
			}
			break;
		case "month":
			dataParse(d3.timeFormat("%Y/%m"));
			break;
	}
	
	function dataParse(parseTime){
		selectedData.ios.forEach(
			function(data){
				var parsedDate=parseTime(d3.timeParse("%Y-%m-%d")(data.date));
				var ios=download.iosData;
				if(!ios.date.includes(parsedDate)){
					ios.date.push(parsedDate);
					ios.value.push(data.downloads);
				}
				else
					ios.value[ios.date.indexOf(parsedDate)]+=data.downloads;
			}
		)
		
		selectedData.android.forEach(
			function(data){
				var parsedDate=parseTime(d3.timeParse("%Y-%m-%d")(data.date));
				var android=download.androidData;
				if(!android.date.includes(parsedDate)){
					android.date.push(parsedDate);
					android.value.push(data.downloads);
				}
				else
					android.value[android.date.indexOf(parsedDate)]+=data.downloads;
			}
		)
	}
	
	return {
		data:download,
		name:'download'
	}
}

const mapDispatchToProp=dispatch=>{
	return {};
}

const ContainerLineChart=connect(
	mapStateToProp,
	mapDispatchToProp
)(LineChart);

export default ContainerLineChart;
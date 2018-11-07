import {connect} from 'react-redux';
import LineChart from '../components/Charts/LineChart/LineChart';
import * as d3 from 'd3';

const mapStateToProp=state=>{
	var download={'iosData':{'date':[],'value':[]},'androidData':{'date':[],'value':[]}};
	switch(state.timeScaleFilter){
		case "day":
			dataParse(d3.timeFormat("%m/%d"));
			break;
		case "week":
			dataParse(d3.timeFormat("%U"));
			break;
		case "month":
			dataParse(d3.timeFormat("%Y/%m"));
			break;
	}
	
	function dataParse(parseTime){
		state.userData.iosData.forEach(
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
		
		state.userData.androidData.forEach(
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
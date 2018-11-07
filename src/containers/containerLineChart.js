import {connect} from 'react-redux';
import LineChart from '../components/Charts/LineChart/LineChart';
import * as d3 from 'd3';

const mapStateToProp=state=>{
	var download={'iosData':{'date':[],'value':[]},'androidData':{'date':[],'value':[]}};
	state.userData.iosData.forEach(
		function(data){
			//var date=d3.timeParse("%Y-%m-%d")(data.date);//Date Object
			download.iosData.date.push(data.date);
			download.iosData.value.push(data.downloads);
		}
	)
	state.userData.androidData.forEach(
		function(data){
			//var date=d3.timeParse("%Y-%m-%d")(data.date);//Date Object
			download.androidData.date.push(data.date);
			download.androidData.value.push(data.downloads);
		}
	)
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
import {connect} from 'react-redux';
import LineChart from '../components/Charts/LineChart/LineChart';
import transform from '../utils/dataTransform';

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
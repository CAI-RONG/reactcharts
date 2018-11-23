import {connect} from 'react-redux';
import LineChart from '../components/Charts/LineChart/LineChart';
import transform from '../utils/dataTransform';

const mapStateToProp=(state,props)=>{
	return transform(state,props);
}

const mapDispatchToProp=dispatch=>{
	return {};
}

const ContainerLineChart=connect(
	mapStateToProp,
	mapDispatchToProp
)(LineChart);

export default ContainerLineChart;
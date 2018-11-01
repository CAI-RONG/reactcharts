import React from 'react';
import {connect} from 'react-redux';
import PieChart from '../components/Charts/PieChart/PieChart';
import {changeColor} from '../redux/actions/userActions';

const mapStateToProps=state=>{
	return {
		data:state.data,
		name:state.name
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		bgcChange:bgc=>dispatch(changeColor(bgc))
	}
}

const ContainerPieChart=connect(
	mapStateToProps,
	mapDispatchToProps
)(PieChart);

export default ContainerPieChart;
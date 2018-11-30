
import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";
import Gridcalculator from "../utils/Gridcalculator";
import * as d3 from 'd3';

const mapStateToProps=(state,props)=>{

	var outputData= Gridcalculator(state, 'operator', state.beginDate, state.timeScaleFilter);


	return {
		name:props.name,
		MonthlyData:outputData,
		data:state.data,
		header:props.header
	}
}

const mapDispatchToProp=(dispatch)=>{
	return {}
}

const GridContainer=connect(
	mapStateToProps,
	mapDispatchToProp
)(Grid);

export default GridContainer;
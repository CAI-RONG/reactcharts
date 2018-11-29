
import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";
import Gridcalculator from "../utils/Gridcalculator";
import * as d3 from 'd3';

const mapStateToProps=(state,props)=>{


	var begin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));
	var	end=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.endDate));
	
	
	if(state.beginDate>state.endDate || state.endDate===undefined)
		end=d3.timeParse("%Y-%m-%d")(state.userDataLastDay);
	


	var outputData= Gridcalculator(state,  begin, end);

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
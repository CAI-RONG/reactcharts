import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";
import Gridcalculator from "../utils/Gridcalculator";
import numberWithCommas from "../utils/numberWithCommas";

const mapStateToProps=(state,props)=>{

	var outputData= Gridcalculator(state, 'operator', state.beginDate, state.timeScaleFilter);

	outputData.forEach(
		function(d){
			d.currentAmount = numberWithCommas(d.currentAmount);
			d.lastAmount=numberWithCommas(d.lastAmount);
			d.diffAmount=numberWithCommas(d.currentAmount-d.lastAmount);		
			d.currentValue=numberWithCommas(d.currentValue);
			d.lastValue=numberWithCommas(d.lastValue);
			d.diffValue=numberWithCommas(d.currentValue-d.lastValue);
		}
	);

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
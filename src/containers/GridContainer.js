import {connect} from 'react-redux';
import Grid from "../components/RevenueGrid/Grid";
import Gridcalculator from "../utils/Gridcalculator";

const mapStateToProps=(state,props)=>{

	var outputData= Gridcalculator(state, 'operator', state.beginDate, state.timeScaleFilter);

	/*return {
		name:props.name,
		MonthlyData:outputData,
		data:state.data,
		header:props.header
	}*/

	const ios=state.revenueAnalyticsReducer.offRoadData.iOS;
	const android=state.revenueAnalyticsReducer.offRoadData.Android;

	if(ios){
		var output=[];

		ios.forEach(
			(datum,i)=>{
				output.push(
					Object.assign({},{
						brand_name:datum.brand_name,
						current_qty:datum.current_qty+android[i].current_qty,
						last_qty:datum.last_qty+android[i].last_qty,
						diff_qty:datum.diff_qty+android[i].diff_qty,
						ratio_qty:parseInt(((datum.diff_qty+android[i].diff_qty)/(datum.last_qty+android[i].last_qty)).toFixed(2)*100),
						current_amt:datum.current_amt+android[i].current_amt,
						last_amt:datum.last_amt+android[i].last_amt,
						diff_amt:datum.diff_amt+android[i].diff_amt,
						ratio_amt:parseInt(((datum.diff_amt+android[i].diff_amt)/(datum.last_amt+android[i].last_amt)).toFixed(2)*100),
						subData:[datum,android[i]]
					})
				)
			}
		)
	}

	console.log(state.revenueAnalyticsReducer);
	console.log(output);
	switch(props.name){
		case '路外停車':
			return {
				name:props.name,
				data:output,
				header:props.header
			};
		default:
			return {
				name:props.name,
				MonthlyData:outputData,
				data:state.data,
				header:props.header
			};
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
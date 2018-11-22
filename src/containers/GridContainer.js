import React from "react";
import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";

import * as d3 from 'd3';

const mapStateToProps=(state,props)=>{
	//data.json
/*
			訂單數															訂單金額
			上期	(10月)					|	本期 (11月)						上期		本期
	千里亭 	建國場+北投一場+...+林森機械場	|	建國場+北投一場+...+林森機械場
	詮營									|
*/
	var outputData={'monthlyData':[]};
	var op;



	state.data.forEach(
		function(value, index){

			op = state.data[index].Operator;
			outputData.monthlyData.push({ Operator: op, Last: 6, Current:23});
	
		}
	)

	



	return {
		name:props.name,
		data:outputData.monthlyData,
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
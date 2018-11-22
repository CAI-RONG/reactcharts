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
	var op, pklot;
	var monthlyAmount=0,monthlyValue=0;

	var Month = new Date().getMonth()+1;





	state.data.forEach(
		function(value, index){
			op = state.data[index];
			op.PKLots.forEach(
				function(value, index){
					pklot=op.PKLots[index];
					pklot.transactions.forEach(
						function(value, index){
							monthlyAmount += pklot.transactions[index].transactionAmount
							monthlyValue += pklot.transactions[index].transactionValue
						}
					)
				}
			)
			outputData.monthlyData.push({ Operator: op.Operator, LastAmount: 120000, CurrentAmount:monthlyValue, LastValue:  180000, CurrentValue:monthlyValue });
	
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
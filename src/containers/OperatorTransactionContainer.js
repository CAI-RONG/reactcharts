import React from 'react';
import {connect} from 'react-redux';
import OperatorTransaction from  "../components/Revenue/OperatorTransaction";

const mapStateToProp=(state,props)=>{
	
	var outputData={'monthlyData':[]};
	var op, pklot;


	state.data.map(
		function(value, index){
			op = state.data[index];
			if(op.Operator === props.Operator){ 
				op.PKLots.map(
					function(value, index){
						pklot=op.PKLots[index];
						outputData.monthlyData.push({ LastAmount: pklot.name, CurrentAmount: 4, LastValue: 5, CurrentValue: 6 });
					}
				)
				
			}		
		}
	)
	
	return {
		data:outputData.monthlyData
	}
}

const mapDispatchToProp=state=>{
	return {}
}

const OperatorTransactionContainer=connect(
	mapStateToProp,
	mapDispatchToProp
)(OperatorTransaction);

export default OperatorTransactionContainer;
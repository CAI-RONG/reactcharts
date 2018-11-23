import React from 'react';
import {connect} from 'react-redux';
import PKLotsTransaction from  "../components/Revenue/PKLotsTransaction";
import * as d3 from 'd3';
import _ from 'lodash';

const mapStateToProp=(state,props)=>{
	
	var outputData={'PKLotsMonthlyData':[]};
	var selectedData;
	var op, pklot;

	state.data.map(
		function(value, index){
			op = state.data[index];
			if(op.Operator == props.Operator){ 
				op.PKLots.map(
					function(value, index){
						pklot=op.PKLots[index];
						var Today=new Date();
						var days = new Date( Today.getFullYear(),(Today.getMonth()+1),0).getDate();
						var Y = Today.getFullYear();
						var M = Today.getMonth()+1;
						var begin = Y+"-"+M+"-01";
						var	end = Y+"-"+M+"-"+days;

						selectedData={'select':pklot.transactions.slice()};	
						var i=0,j=0;
						selectedData.select.forEach(
							function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<d3.timeParse("%Y-%m-%d")(begin))i++;}
						)
						selectedData.select.splice(0,i);
						
						i=0;j=0;
						selectedData.select.forEach(
							function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>d3.timeParse("%Y-%m-%d")(end))i++;}
						)
						selectedData.select.splice(selectedData.select.length-i,i);

 						var totalAmount	= _.sumBy(selectedData.select, 'transactionAmount');
 						var totalValue	= _.sumBy(selectedData.select, 'transactionValue');						
						
						outputData.PKLotsMonthlyData.push({ name:pklot.name,
															date:Y+"/"+M,
															LastAmount:34000,
															CurrentAmount: totalAmount, 
															LastValue: 40000, 
															CurrentValue: totalValue });
					}
				)
				
			}		
		}
	)
	
	return {
		data:outputData.PKLotsMonthlyData
	}
}

const mapDispatchToProp=state=>{
	return {}
}
const PKLotsTransactionContainer=connect(
	mapStateToProp,
	mapDispatchToProp
)(PKLotsTransaction);

export default PKLotsTransactionContainer;
import {connect} from 'react-redux';
import OperatorTransaction from  "../components/Revenue/OperatorTransaction";
import * as d3 from 'd3';
import _ from 'lodash';

const mapStateToProp=(state,props)=>{
	
	var outputData={'OperatorMonthlyData':[]};
	var op, pklot;
	var Today=new Date();
	var Y = Today.getFullYear();
	var M = Today.getMonth()+1;
	var currentAmount=null,currentValue=null;
	var lastAmount,lastValue;


	state.data.map(function(value, index){
			op = state.data[index];
			if(op.Operator === props.Operator){ 
				/*--this month--*/
				currentAmount=null; currentValue=null;
				op.PKLots.map(function(value, index){
					pklot=op.PKLots[index];
					var days = new Date(Y,M,0).getDate();
					var begin = Y+"-"+M+"-01";
					var	end = Y+"-"+M+"-"+days;

					var selectedData={'select':pklot.transactions.slice()};	
					var i=0;
					selectedData.select.forEach(function(data){
						if(d3.timeParse("%Y-%m-%d")(data.date)<d3.timeParse("%Y-%m-%d")(begin))i++;
					})
					selectedData.select.splice(0,i);
					i=0;
					selectedData.select.forEach(function(data){
						if(d3.timeParse("%Y-%m-%d")(data.date)>d3.timeParse("%Y-%m-%d")(end))i++;
					})
					selectedData.select.splice(selectedData.select.length-i,i);
				 	currentAmount += _.sumBy(selectedData.select, 'transactionAmount');
					currentValue += _.sumBy(selectedData.select, 'transactionValue');	
					return 0;					
				})

				_.times(11,(function(){
					M--;
					lastAmount=0; lastValue=0;
					op.PKLots.map(function(value, index){
						/*--各停車場--*/
						pklot=op.PKLots[index];
						var days = new Date(Y,M,0).getDate();
						var begin = Y+"-"+M+"-01";
						var	end = Y+"-"+M+"-"+days;

						var selectedData={'select':pklot.transactions.slice()};	
						var i=0;
						selectedData.select.forEach(function(data){
							if(d3.timeParse("%Y-%m-%d")(data.date)<d3.timeParse("%Y-%m-%d")(begin))i++;
						})
						selectedData.select.splice(0,i);
						i=0;
						selectedData.select.forEach(function(data){
							if(d3.timeParse("%Y-%m-%d")(data.date)>d3.timeParse("%Y-%m-%d")(end))i++;
						})
						selectedData.select.splice(selectedData.select.length-i,i);
				 		lastAmount += _.sumBy(selectedData.select, 'transactionAmount');
				 		lastValue += _.sumBy(selectedData.select, 'transactionValue');															
						/*--/各停車場--*/		
						return 0;			
					})
					/*--/op.PKLots.map--*/
					outputData.OperatorMonthlyData.push({ date:Y+"/"+(M+1),
														LastAmount: lastAmount,
														CurrentAmount: currentAmount, 
														LastValue: lastValue, 
														CurrentValue: currentValue 
														});
					
					currentAmount=lastAmount;
					currentValue=lastValue;
					return 0;					
				}))

				
			}
			return 0;		
		}
	)
	
	return {
		data:outputData.OperatorMonthlyData
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

import {connect} from 'react-redux';
import PKLotsTransaction from  "../components/Revenue/PKLotsTransaction";
import * as d3 from 'd3';
import _ from 'lodash';

const mapStateToProp=(state,props)=>{
	
	var outputData={'PKLotsMonthlyData':[]};
	var op, pklot;
	var Today=new Date();
	var Y = Today.getFullYear();
	var M = Today.getMonth()+1;
	var currentAmount=null,currentValue=null;
	var lastAmount,lastValue;
	var transactions=[];

	state.data.map(function(value, index){
		op = state.data[index];
		if(op.Operator === props.Operator){ 
			///"PKLots.length" times loop
 			op.PKLots.map(function(value, index){
				pklot=op.PKLots[index];
				M = Today.getMonth()+1;
				
				_.times(11,function(){
				currentAmount=null; currentValue=null;
				var days = new Date(Y,M,0).getDate();
				var begin = Y+"-"+M+"-01";
				var	end = Y+"-"+M+"-"+days;
				var selectedData={'select':pklot.transactions.slice()};	
				var i=0;
				selectedData.select.forEach(function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<d3.timeParse("%Y-%m-%d")(begin)) return i++;})
				selectedData.select.splice(0,i);			
				i=0;
				selectedData.select.forEach(function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>d3.timeParse("%Y-%m-%d")(end))return i++;})
				selectedData.select.splice(selectedData.select.length-i,i);
		 		currentAmount = _.sumBy(selectedData.select, 'transactionAmount');
				currentValue = _.sumBy(selectedData.select, 'transactionValue');	
				M--;
				lastAmount=null; lastValue=null;
				var days = new Date(Y,M,0).getDate();
				var begin = Y+"-"+M+"-01";
				var	end = Y+"-"+M+"-"+days;
				selectedData={'select':pklot.transactions.slice()};	
				var i=0;
				selectedData.select.forEach(function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<d3.timeParse("%Y-%m-%d")(begin))i++;})
				selectedData.select.splice(0,i);
				i=0;
				selectedData.select.forEach(function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>d3.timeParse("%Y-%m-%d")(end))i++;})
				selectedData.select.splice(selectedData.select.length-i,i);
			 	lastAmount = _.sumBy(selectedData.select, 'transactionAmount');
			 	lastValue = _.sumBy(selectedData.select, 'transactionValue');

				return transactions.push({ name:pklot.name,
									date:Y+"/"+(M+1),
									LastAmount:lastAmount,
									CurrentAmount: currentAmount, 
									LastValue: lastValue, 
									CurrentValue: currentValue });
				})
				return outputData.PKLotsMonthlyData.push({ name:pklot.name, transactions:transactions });		
			})				
		}
		return 0;
	})
	console.log(transactions);	
	console.log(outputData);
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
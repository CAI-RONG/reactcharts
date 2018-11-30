
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
	var amount=null,value=null;

	var transactions={'Date':[], 'Amount':[], 'Value':[]};
	var time=10;

	state.data.map(function(value, index){
		op = state.data[index];
		if(op.Operator === props.Operator){ 
 			op.PKLots.map(function(value, index){
				pklot=op.PKLots[index];
				M = Today.getMonth()+1;
				
				_.times(time,function(){
					amount=null; value=null;
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
			 		amount = _.sumBy(selectedData.select, 'transactionAmount');
					value = _.sumBy(selectedData.select, 'transactionValue');	
					M--;

					transactions.Amount.push(amount);
					transactions.Value.push(value);
					transactions.Date.push(Y+"/"+(M+1));
				})
				
				var amountArr = _.chunk(transactions.Amount, time);
				var valueArr = _.chunk(transactions.Value, time);
				var dateArr = _.chunk(transactions.Date, time);
				
				return outputData.PKLotsMonthlyData.push({  name:pklot.name, 
															date: _.reverse(dateArr[index]),
															Amount:_.reverse(amountArr[index]),
															Value: _.reverse(valueArr[index])
														});		
			})				
		}
		return 0;
	})

	//console.log(outputData);
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
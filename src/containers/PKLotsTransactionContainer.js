
import {connect} from 'react-redux';
import PKLotsTransaction from  "../components/Revenue/PKLotsTransaction";
import * as d3 from 'd3';
import _ from 'lodash';
import Gridcalculator from '../utils/Gridcalculator';

const mapStateToProp=(state,props)=>{
	
	/*var outputData={'PKLotsMonthlyData':[]};
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
	*/
	var outputData=[];
	var calculatedData=Gridcalculator(state,'PKLots', state.beginDate, state.timeScaleFilter);
	
	function outputObject(data){
		var obj={
			'dataForTable':data,
			'TransactionAmount':{'date':[],'value':[]},
			'TransactionValue':{'date':[],'value':[]}
		}
		return obj;
	}
	
	for(var i in calculatedData){
		if(calculatedData[i].operator===props.Operator)
			outputData.push(outputObject(calculatedData[i]));
	}
	
	var dataUnderOperator=state.data.find(function(d){return d.Operator===props.Operator});
	dataUnderOperator.PKLots.map(
		function(t){
			var beginDate=new Date(new Date().getFullYear(),new Date().getMonth()-6);
			var endDate=new Date(new Date().getFullYear(),new Date().getMonth());
			//var month=[], amount=[], value=[];
			for(var j in outputData){
				if(t.name===outputData[j].dataForTable.name){
					t.transactions.forEach(
						function(c){
							var currentDate=d3.timeParse("%Y-%m-%d")(c.date);
							if(currentDate>=beginDate && currentDate<endDate){
								if(!outputData[j].TransactionAmount.date.includes(d3.timeFormat("%Y/%m")(currentDate))){
									outputData[j].TransactionAmount.date.push(d3.timeFormat("%Y/%m")(currentDate));
									outputData[j].TransactionValue.date.push(d3.timeFormat("%Y/%m")(currentDate));
									outputData[j].TransactionAmount.value.push(c.transactionAmount);
									outputData[j].TransactionValue.value.push(c.transactionValue);
								}
								else{
									outputData[j].TransactionAmount.value[outputData[j].TransactionAmount.date.indexOf(d3.timeFormat("%Y/%m")(currentDate))]+=c.transactionAmount;
									outputData[j].TransactionValue.value[outputData[j].TransactionAmount.date.indexOf(d3.timeFormat("%Y/%m")(currentDate))]+=c.transactionValue;
								}	
							}
						}
					);
				}		
			}		
		}
	);
	
	//console.log(outputData);
	
	return {
		data:outputData
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
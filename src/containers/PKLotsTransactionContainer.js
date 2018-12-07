
import {connect} from 'react-redux';
import PKLotsTransaction from  "../components/Revenue/PKLotsTransaction";
import * as d3 from 'd3';
import Gridcalculator from '../utils/Gridcalculator';

const mapStateToProp=(state,props)=>{

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
	//console.log(calculatedData);
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
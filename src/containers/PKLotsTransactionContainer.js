
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
	
	var limit=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));
	switch(state.timeScaleFilter){
		case 'day':
			limit=new Date(limit.getFullYear(),limit.getMonth()-1,limit.getDate());
			break;
		case 'week':
			limit=new Date(limit.getFullYear(),limit.getMonth()-3,limit.getDate());
			break;
		case 'month':
			limit=new Date(limit.getFullYear(),limit.getMonth()-6);
			break;
		default:
			return console.log("PKLots Transaction Container State TimeScaleFilter Error");
	}
	var current;
	function parser(date){
		switch(state.timeScaleFilter){
			case 'week':
				current=d3.timeFormat("%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-7));
				return d3.timeFormat("%U")(d3.timeParse("%Y-%m-%d")(date));
			case 'month':
				current=d3.timeFormat("%Y/%m")(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1));
				return d3.timeFormat("%Y/%m")(d3.timeParse("%Y-%m-%d")(date));
			case 'day':
				current=d3.timeFormat("%Y-%m-%d")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-1));
				return d3.timeFormat("%Y-%m-%d")(d3.timeParse("%Y-%m-%d")(date));
			default:
				return console.log("PKLots Transaction Container Function Parser Error");
		}
	}
	
	function previous(date){
		switch(state.timeScaleFilter){
			case 'week':
				return new Date(date.getFullYear(),date.getMonth(),date.getDate()-7);
			case 'month':
				return new Date(date.getFullYear(),date.getMonth(),date.getDate()-(new Date(date.getFullYear(),date.getMonth(),0).getDate()));
			case 'day':
				return new Date(date.getFullYear(),date.getMonth(),date.getDate()-1);
			default:
				return console.log("PKLots Transaction Container Function Previous Error");	
		}
	}
	
	//console.log(calculatedData);
	for(var i in calculatedData){
		if(calculatedData[i].operator===props.Operator)
			outputData.push(outputObject(calculatedData[i]));
	}
	
	var dataUnderOperator=state.data.find(function(d){return d.Operator===props.Operator});
	/*dataUnderOperator.PKLots.map(
		function(t){
			//var beginDate=new Date(new Date().getFullYear(),new Date().getMonth()-6);
			//var endDate=new Date(new Date().getFullYear(),new Date().getMonth());
			//var month=[], amount=[], value=[];
			for(var j in outputData){
				if(t.name===outputData[j].dataForTable.name){
					t.transactions.forEach(
						function(c){
							var currentDate=parser(c.date);
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
	);*/
	var pushPKLotsData = function() { dataUnderOperator.PKLots.forEach(function(p){
				total.name=p.name;
				p.transactions.forEach(function(t){
						var parsedDate=parser(t.date,selectedDate);
						if(parsedDate===current){
							total.amount+=t.transactionAmount;
							total.value+=t.transactionValue;
						}
					}
				)
				if(state.timeScaleFilter==='week'){
					current=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-7)));
					current=d3.timeFormat("%m/%d")(current)+'-'+d3.timeFormat("%m/%d")(new Date(current.getFullYear(),current.getMonth(),current.getDate()+6));
				}
				total.date=current;
				
				var currentPKLots=outputData.find(p=>p.dataForTable.name===total.name);

				currentPKLots.TransactionAmount.date.push(total.date);
				currentPKLots.TransactionAmount.value.push(total.amount);
				currentPKLots.TransactionValue.date.push(total.date);
				currentPKLots.TransactionValue.value.push(total.value);
			}
		)
	};
	
	for(var selectedDate=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));selectedDate>=limit;selectedDate=previous(selectedDate)){
		var total={'name':'','date':'','amount':0,'value':0}
		pushPKLotsData();
	}
	
	outputData.forEach(
		function(d){
			d.TransactionAmount.date.reverse();
			d.TransactionAmount.value.reverse();
			d.TransactionValue.date.reverse();
			d.TransactionValue.value.reverse();
		}
	)
	

	return {
		data:outputData,
		unit:state.unitFilter==='K'?1000:1
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
import {connect} from 'react-redux';
import OperatorTransaction from  "../components/Revenue/OperatorTransaction";
import * as d3 from 'd3';

const mapStateToProp=(state,props)=>{
	var outputData={
		'dataForTable':[],
		'Amount':{'date':[],'value':[]},
		'Value':{'date':[],'value':[]}
	};
	var current,last;
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
	}
	
	function parser(date,selectedDate){
		switch(state.timeScaleFilter){
			case 'week':
				current=d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-7));
				last=d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-14));
				if(typeof(date)==='string')
					return d3.timeFormat("%Y/%U")(d3.timeParse("%Y-%m-%d")(date));
				else
					return d3.timeFormat("%Y/%U")(date);
			case 'month':
				current=d3.timeFormat("%Y/%m")(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1));
				last=d3.timeFormat("%Y/%m")(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-2));
				return d3.timeFormat("%Y/%m")(d3.timeParse("%Y-%m-%d")(date));
			case 'day':
				current=d3.timeFormat("%Y-%m-%d")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-1));
				last=d3.timeFormat("%Y-%m-%d")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-2));
				return d3.timeFormat("%Y-%m-%d")(d3.timeParse("%Y-%m-%d")(date));
			default:
				return console.log("OperatorTransaction Container Function Parser Error");
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
				return console.log("OperatorTransaction Container Function Previous Error");
		}
	}
	
	var dataUnderOperator=state.data.find(d=>d.Operator===props.Operator);
	
	for(var selectedDate=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate)); 
		selectedDate>=limit; 
		selectedDate=previous(selectedDate)){
		
		var total={
			'name':props.Operator,
			'date':'',
			'currentAmount':0,
			'lastAmount':0,
			'diffAmount':0,
			'ratioAmount':0,
			'currentValue':0,
			'lastValue':0,
			'diffValue':0,
			'ratioValue':0
		}
		
		dataUnderOperator.PKLots.forEach(
			function(p){
				p.transactions.forEach(
					function(t){
						var parsedDate=parser(t.date,selectedDate);
						if(parsedDate===current){
							total.currentAmount+=t.transactionAmount;
							total.currentValue+=t.transactionValue;
						}
						if(parsedDate===last){
							total.lastAmount+=t.transactionAmount;
							total.lastValue+=t.transactionValue;
						}
					}
				)
			}
		)
		if(state.timeScaleFilter==='week'){
			current=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-7)));
			current=d3.timeFormat("%m/%d")(current)+'-'+d3.timeFormat("%m/%d")(new Date(current.getFullYear(),current.getMonth(),current.getDate()+6));
		}
		total.date=current;
		total.diffAmount=total.currentAmount-total.lastAmount;
		total.ratioAmount=parseInt((total.currentAmount/total.lastAmount-1)*100);
		total.diffValue=total.currentValue-total.lastValue;
		total.ratioValue=parseInt((total.currentValue/total.lastValue-1)*100);
		
		outputData.dataForTable.push(total);
		outputData.Amount.date.push(total.date);
		outputData.Amount.value.push(total.currentAmount);
		outputData.Value.date.push(total.date);
		outputData.Value.value.push(total.currentValue);
	}
	outputData.Amount.date.reverse();
	outputData.Amount.value.reverse();
	outputData.Value.date.reverse();
	outputData.Value.value.reverse();
	
	return {
		data:outputData
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
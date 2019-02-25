import {connect} from 'react-redux';
import OperatorTransaction from  "../components/RevenueGrid/OperatorTransaction";
import * as d3 from 'd3';
import axios from 'axios';
import {operatorTransactionData, getAccessToken} from '../redux/actions/userActions';
import {persistor} from '../redux/store';

const mapStateToProp=(state,props)=>{
	/*var outputData={
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
		default:
			console.log("Operator Transaction Container State TimeScaleFilter Error");
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
	
	var dataUnderOperator=state.revenueAnalyticsReducer.data.find(d=>d.Operator===props.Operator);
	
	var calculate = function() {dataUnderOperator.PKLots.forEach(
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
		)}


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
		calculate();
		
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
	outputData.Value.value.reverse();*/

	const ios=state.revenueAnalyticsReducer.operatorTransactionData.iOS;
	const android=state.revenueAnalyticsReducer.operatorTransactionData.Android;
	var output=[];

	if(ios){		
		ios.forEach(
			(datum,i)=>{
				output.push(
					{
						date:d3.timeFormat("%m/%d")(d3.timeParse("%Y-%m-%d")(datum.beginDate))+'-'+d3.timeFormat("%m/%d")(d3.timeParse("%Y-%m-%d")(datum.endDate)),
						current_qty:typeof(datum.current_qty) == 'string'?'No Data':datum.current_qty+android[i].current_qty,
						last_qty:typeof(datum.last_qty) == 'string'?'No Data':datum.last_qty+android[i].last_qty,
						diff_qty:typeof(datum.diff_qty) == 'string' ?'No Data':datum.diff_qty+android[i].diff_qty,
						ratio_qty:typeof(datum.diff_qty) == 'string' ?'No Data':parseInt(((datum.diff_qty+android[i].diff_qty)/(datum.last_qty+android[i].last_qty)).toFixed(2)*100),
						current_amt:typeof(datum.current_amt) == 'string' ?'No Data':datum.current_amt+android[i].current_amt,
						last_amt:typeof(datum.last_amt) == 'string' ?'No Data':datum.last_amt+android[i].last_amt,
						diff_amt:typeof(datum.diff_amt) == 'string' ?'No Data':datum.diff_amt+android[i].diff_amt,
						ratio_amt:typeof(datum.diff_amt) == 'string' ?'No Data':parseInt(((datum.diff_amt+android[i].diff_amt)/(datum.last_amt+android[i].last_amt)).toFixed(2)*100),
						subData:[
							Object.assign({},datum,{
								date:d3.timeFormat("%m/%d")(d3.timeParse("%Y-%m-%d")(datum.beginDate))+'-'+d3.timeFormat("%m/%d")(d3.timeParse("%Y-%m-%d")(datum.endDate)),
								device_type:1
							}),
							Object.assign({},android[i],{
								date:d3.timeFormat("%m/%d")(d3.timeParse("%Y-%m-%d")(datum.beginDate))+'-'+d3.timeFormat("%m/%d")(d3.timeParse("%Y-%m-%d")(datum.endDate)),
								device_type:2
							})
						]
					}
				)
			}
		)
		output.reverse();
	}
	console.log(output);
	
	return {
		data:output,
		unit:state.unitFilter==='K'?1000:1,
		operator:props.Operator,
		access_token:'Bearer '+state.authReducer.access_token,
		refresh_token:'Bearer '+state.authReducer.refresh_token,
		begin:state.filterReducer.beginDate,
		end:state.filterReducer.endDate,
		timeUnit:state.filterReducer.timeScaleFilter,
		page:state.revenueAnalyticsReducer.metadata.page,
		per_page:state.revenueAnalyticsReducer.metadata.per_page
	}
}

const mapDispatchToState=dispatch=>{
	return {
		set_operatorTransaction_data:data=>dispatch(operatorTransactionData(data)),
		set_access_token:token=>dispatch(getAccessToken(token))
	}
}

const mergeProps=(stateProps,dispatchProps)=>{
	return {
		loadComponent:()=>{
			axios.get('http://localhost:5000/api/operatorTransaction/',{
					params:{
						begin:stateProps.begin,
						end:stateProps.end,
						timeUnit:stateProps.timeUnit,
						page:stateProps.page,
						per_page:stateProps.per_page,
						operator:stateProps.operator
					},
					headers:{
						Authorization:stateProps.access_token
					}
				}
			).then(
				response=>{
					console.log(response.data.data);
					dispatchProps.set_operatorTransaction_data(response.data.data);
				}
			).catch(
				error=>{
					alert(error);
					if(error.response){
						if(error.response.status===401 && error.response.data.msg==='Token has been revoked')
							window.location.href=window.location.origin+'/login';
						else{
							alert(error.response.data.msg);
							axios.get('http://localhost:5000/api/get_refresh_token/',{
								headers:{
									Authorization:stateProps.refresh_token
								}
							}).then(response=>{
								dispatchProps.set_access_token(response.data.access_token);
								this.getData();
							}).catch(error=>{
								console.log(error);
								persistor.purge();
								window.location.href=window.location.origin+'/login';
							});
						}
					}
				}
			)
		},
		data:stateProps.data,
		unit:stateProps.unit,
		operator:stateProps.operator
	}
}

const OperatorTransactionContainer=connect(
	mapStateToProp,
	mapDispatchToState,
	mergeProps
)(OperatorTransaction);

export default OperatorTransactionContainer;
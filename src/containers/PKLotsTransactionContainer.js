
import {connect} from 'react-redux';
import PKLotsTransaction from  "../components/RevenueGrid/PKLotsTransaction";
import * as d3 from 'd3';
import axios from 'axios';
import {getAccessToken,pklotTransactionData} from '../redux/actions/userActions';
import {persistor} from '../redux/store';

const mapStateToProp=(state,props)=>{

	/*var outputData=[];
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
	
	//console.log(outputData);*/

	var output=[];
	if(state.revenueAnalyticsReducer.pklotTransactionData){
		const raw_data=state.revenueAnalyticsReducer.pklotTransactionData;

		for(var pklot_name in raw_data){
			const ios=raw_data[pklot_name].iOS;
			const android=raw_data[pklot_name].Android;
			output.push(
				{
					parkinglot_name:pklot_name,
					current_qty:ios[0].order_qty+android[0].order_qty,
					last_qty:ios[1].order_qty?ios[1].order_qty+android[1].order_qty:'No Data',
					diff_qty:ios[1].order_qty?ios[0].order_qty+android[0].order_qty-ios[1].order_qty-android[1].order_qty:'No Data',
					ratio_qty:ios[1].order_qty?parseInt(((ios[0].order_qty+android[0].order_qty-ios[1].order_qty-android[1].order_qty)/(ios[1].order_qty+android[1].order_qty)).toFixed(2)*100):'No Data',
					current_amt:ios[0].order_amt+android[0].order_amt,
					last_amt:ios[1].order_amt?ios[1].order_amt+android[1].order_amt:'No Data',
					diff_amt:ios[1].order_amt?ios[0].order_amt+android[0].order_amt-ios[1].order_amt-android[1].order_amt:'No Data',
					ratio_amt:ios[1].order_amt?parseInt(((ios[0].order_amt+android[0].order_amt-ios[1].order_amt-android[1].order_amt)/(ios[1].order_amt+android[1].order_amt)).toFixed(2)*100):'No Data',
					subData:[
						{
							device_type:1,
							current_qty:ios[0].order_qty,
							last_qty:ios[1].order_qty,
							diff_qty:ios[0].order_qty-ios[1].order_qty,
							ratio_qty:parseInt(((ios[0].order_qty-ios[1].order_qty)/ios[1].order_qty).toFixed(2)*100),
							current_amt:ios[0].order_amt,
							last_amt:ios[1].order_amt,
							diff_amt:ios[0].order_amt-ios[1].order_amt,
							ratio_amt:parseInt(((ios[0].order_amt-ios[1].order_amt)/ios[1].order_amt).toFixed(2)*100)
						},
						{
							device_type:2,
							current_qty:android[0].order_qty,
							last_qty:android[1].order_qty,
							diff_qty:android[0].order_qty-android[1].order_qty,
							ratio_qty:parseInt(((android[0].order_qty-android[1].order_qty)/android[1].order_qty).toFixed(2)*100),
							current_amt:android[0].order_amt,
							last_amt:android[1].order_amt,
							diff_amt:android[0].order_amt-android[1].order_amt,
							ratio_amt:parseInt(((android[0].order_amt-android[1].order_amt)/android[1].order_amt).toFixed(2)*100)
						}
					]
				}
			)
		}
	}

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

const mapDispatchToProp=dispatch=>{
	return {
		set_pklotTransaction_data:data=>dispatch(pklotTransactionData(data)),
		set_access_token:token=>dispatch(getAccessToken(token))
	}
}

const mergeProps=(stateProps,dispatchProps)=>{
	return {
		loadComponent:()=>{
			axios.get('http://localhost:5000/api/pklotTransaction/',{
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
			}).then(
				response=>{
					console.log(response.data.data);
					dispatchProps.set_pklotTransaction_data(response.data.data);
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

const PKLotsTransactionContainer=connect(
	mapStateToProp,
	mapDispatchToProp,
	mergeProps
)(PKLotsTransaction);

export default PKLotsTransactionContainer;
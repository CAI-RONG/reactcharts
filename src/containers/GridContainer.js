import React from "react";
import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";

import * as d3 from 'd3';

const mapStateToProps=(state,props)=>{
	var outputData={'monthlyData':[]};

	var begin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));
	var	end=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.endDate));
	
	var op, pklot;
	var lastAmount=0, currentAmount=0;
	var lastValue=0, currentValue=0;
	var Month = new Date().getMonth()+1;

	if(state.beginDate>state.endDate || state.endDate==undefined)
		end=d3.timeParse("%Y-%m-%d")(state.userDataLastDay);
	var selectedData;

	
	state.data.map(
		function(value, index){
			op = state.data[index];
			op.PKLots.map(
				function(value, index){
					pklot=op.PKLots[index];
					selectedData={'select':pklot.transactions.slice()};
					
					/*--selected Data--*/
					var i=0,j=0;
					selectedData.select.forEach(
						function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<begin)i++;}
					)
					selectedData.select.splice(0,i);
					
					i=0;j=0;
					selectedData.select.forEach(
						function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>end)i++;}
					)
					selectedData.select.splice(selectedData.select.length-i,i);
					/*--/selected--*/
				}
			)
			outputData.monthlyData.push({ Operator: op.Operator, LastAmount: lastAmount, CurrentAmount: currentAmount, LastValue: lastValue, CurrentValue: currentValue });
		}
	)
/*
	function dataParse(parseTime,name){
		selectedData.select.forEach(
			function(data){
				var parsedDate=parseTime(d3.timeParse("%Y-%m-%d")(data.date));
				var ios=outputData.iosData;
				if(!ios.date.includes(parsedDate)){
					ios.date.push(parsedDate);
					ios.value.push(data[name]);
				}
				else
					ios.value[ios.date.indexOf(parsedDate)]+=data[name];
			}
		)
	}
*/	



	return {
		name:props.name,
		MonthlyData:outputData.monthlyData,
		data:state.data,
		header:props.header
	}
}

const mapDispatchToProp=(dispatch)=>{
	return {}
}

const GridContainer=connect(
	mapStateToProps,
	mapDispatchToProp
)(Grid);

export default GridContainer;

import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";

import * as d3 from 'd3';

const mapStateToProps=(state,props)=>{
	var begin=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.beginDate));
	var	end=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(state.endDate));
	
	var op, pklot;
	var lastAmount=0, currentAmount=0;
	var lastValue=0, currentValue=0;

	if(state.beginDate>state.endDate || state.endDate===undefined)
		end=d3.timeParse("%Y-%m-%d")(state.userDataLastDay);
	var selectedData;

	var outputData=state.data.map(
		function(d){
			var calculatedData=d.PKLots.map(
				function(t){
					selectedData=t.transactions.slice();
					var i=0,j=0;
					selectedData.forEach(
						function(data){
							if(d3.timeParse("%Y-%m-%d")(data.date)<begin)i++;
							if(d3.timeParse("%Y-%m-%d")(data.date)>end)j++;
						}
					)
					selectedData.splice(0,i);
					selectedData.splice(selectedData.length-j,j);
					
					var sum={
						currentAmount:0,
						currentValue:0,
						lastAmount:0,
						lastValue:0
					};
					const currentMonth=d3.timeFormat("%Y/%m")(new Date());
					const lastMonth=d3.timeFormat("%Y/%m")(new Date((new Date()).getFullYear(),(new Date()).getMonth()-1));
					selectedData.forEach(
						function(r){
							var parsedMonth=d3.timeFormat("%Y/%m")(d3.timeParse("%Y-%m-%d")(r.date));
							if(parsedMonth===currentMonth){
								sum.currentAmount+=r.transactionAmount;
								sum.currentValue+=r.transactionValue;
							}
							if(parsedMonth===lastMonth){
								sum.lastAmount+=r.transactionAmount;
								sum.lastValue+=r.transactionValue;
							}	
						}
					)
					return sum;
				}
			)
			var total={
				currentAmount:0,
				currentValue:0,
				lastAmount:0,
				lastValue:0
			};
			calculatedData.forEach(
				function(s){
					total.currentAmount+=s.currentAmount;
					total.currentValue+=s.currentValue;
					total.lastAmount+=s.lastAmount;
					total.lastValue+=s.lastValue;
				}
			)
			
			return {
				operator:d.Operator,
				currentAmount:total.currentAmount,
				lastAmount:total.lastAmount,
				diffAmount:total.currentAmount-total.lastAmount,
				ratioAmount:parseInt((total.currentAmount/total.lastAmount-1)*100),
				currentValue:total.currentValue,
				lastValue:total.lastValue,
				diffValue:total.currentValue-total.lastValue,
				ratioValue:parseInt((total.currentValue/total.lastValue-1)*100)
			}
		}
	)
	/*state.data.map(
		function(value, index){
			op = state.data[index];
			op.PKLots.map(
				function(value, index){
					pklot=op.PKLots[index];
					selectedData={'select':pklot.transactions.slice()};
					
					/*--selected Data--/
					var i=0;
					selectedData.select.forEach(
						function(data){if(d3.timeParse("%Y-%m-%d")(data.date)<begin)i++;}
					)
					selectedData.select.splice(0,i);
					
					i=0;
					selectedData.select.forEach(
						function(data){if(d3.timeParse("%Y-%m-%d")(data.date)>end)i++;}
					)
					selectedData.select.splice(selectedData.select.length-i,i);
					/*--/selected--/
					return 0;
				}
			)
			return outputData.monthlyData.push({ Operator: op.Operator, LastAmount: lastAmount, CurrentAmount: currentAmount, LastValue: lastValue, CurrentValue: currentValue });
		}
	)*/
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
		MonthlyData:outputData,
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
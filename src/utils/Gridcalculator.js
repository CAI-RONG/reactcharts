import * as d3 from 'd3';

export default function Gridcalculator(state, type, beginDate, timeFilter, operator){

	var selectedDate=d3.timeParse("%Y-%m-%d")(d3.timeFormat("%Y-%m-%d")(beginDate));
	var current,last;
	
	function parser(date){
		switch(timeFilter){
			case 'week':
				current=d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-7));
				last=d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-14));
				return d3.timeFormat("%Y/%U")(d3.timeParse("%Y-%m-%d")(date));
			case 'month':
				current=d3.timeFormat("%Y/%m")(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1));
				last=d3.timeFormat("%Y/%m")(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-2));
				return d3.timeFormat("%Y/%m")(d3.timeParse("%Y-%m-%d")(date));
			case 'day':
				current=d3.timeFormat("%Y-%m-%d")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-1));
				last=d3.timeFormat("%Y-%m-%d")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-2));
				return d3.timeFormat("%Y-%m-%d")(d3.timeParse("%Y-%m-%d")(date));
			default:
				return console.log("Gridcalculator Function Parser Error")
		}
	}

	var outputData;
	if(type==='operator'){
		outputData=state.data.map(
			function(d){
				var calculatedData=d.PKLots.map(
					function(t){
						var selectedData=t.transactions.slice();
							
						var sum={
							currentAmount:0,
							currentValue:0,
							lastAmount:0,
							lastValue:0
						};
						//const currentMonth=d3.timeFormat("%Y/%m")(new Date());
						//const lastMonth=d3.timeFormat("%Y/%m")(new Date((new Date()).getFullYear(),(new Date()).getMonth()-1));
						
						selectedData.forEach(
							function(r){
								var parsedDate=parser(r.date);

								if(parsedDate===current){
									sum.currentAmount+=r.transactionAmount;
									sum.currentValue+=r.transactionValue;
								}
								if(parsedDate===last){
									sum.lastAmount+=r.transactionAmount;
									sum.lastValue+=r.transactionValue;
								}
							}
						);
						return sum;
					}
				);
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
				);
				if(timeFilter==='week'){
					current=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-7)));
					current=d3.timeFormat("%m/%d")(current)+'-'+d3.timeFormat("%m/%d")(new Date(current.getFullYear(),current.getMonth(),current.getDate()+6));
					last=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()-14)));
					last=d3.timeFormat("%m/%d")(last)+'-'+d3.timeFormat("%m/%d")(new Date(last.getFullYear(),last.getMonth(),last.getDate()+6));
				}
				return {
					currentDate:current,
					lastDate:last,
					name:d.Operator,
					currentAmount:total.currentAmount,
					lastAmount:total.lastAmount,
					diffAmount:total.currentAmount-total.lastAmount,
					ratioAmount:parseInt((total.currentAmount/total.lastAmount-1)*100),
					currentValue:total.currentValue,
					lastValue:total.lastValue,
					diffValue:total.currentValue-total.lastValue,
					ratioValue:parseInt((total.currentValue/total.lastValue-1)*100)
				};
			}
		);
	}
	else if(type==='PKLots'){
		outputData=[];
		var output=state.data.map(
			function(d){
				var calculatedData=d.PKLots.map(
					function(t){
						var selectedData=t.transactions.slice();
							
						var sum={
							name:"",
							currentAmount:0,
							currentValue:0,
							lastAmount:0,
							lastValue:0
						};
						
						selectedData.forEach(
							function(r){
								var parsedDate=parser(r.date);
								if(parsedDate===current){
									sum.currentAmount+=r.transactionAmount;
									sum.currentValue+=r.transactionValue;
								}
								if(parsedDate===last){
									sum.lastAmount+=r.transactionAmount;
									sum.lastValue+=r.transactionValue;
								}	
							}
						);
						sum.name=t.name;
						sum['date']=current;
						sum['diffAmount']=sum.currentAmount-sum.lastAmount;
						sum['diffValue']=sum.currentValue-sum.lastValue;
						sum['ratioAmount']=parseInt((sum.currentAmount/sum.lastAmount-1)*100);
						sum['ratioValue']=parseInt((sum.currentValue/sum.lastValue-1)*100)
						return sum;
					}
				);
				/*var total={
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
				);*/
				calculatedData.forEach(
					function(s){
						s['operator']=d.Operator;
					}
				);
				
				return calculatedData;
			}
		);
		for(var k in output){
			outputData.push(...output[k]);
		}
	}
	
	return outputData;
}
import {connect} from 'react-redux';
import UserStatusTable from '../components/UserStatusTable';
import * as d3 from 'd3';
import transform from '../utils/dataTransform';

const mapStateToProp=state=>{
	var outputData=[];
	var keys=Object.keys(state.userData.iosData[0]);
	var dataPerUnit={};

	function getValue(d,i){return d+lineChartData.data.Android.value[i];}

	for(var n=1; n<9; ++n){
		var lineChartData=transform(state,{'active':false,'name':keys[n]});
		var currentObject={};
		currentObject[keys[n]]=lineChartData.data.iOS.value.map(getValue);
		dataPerUnit=Object.assign({},dataPerUnit,currentObject);
	}
	var dateObject={};
	dateObject['date']=lineChartData.data.iOS.date;
	dataPerUnit=Object.assign({},dataPerUnit,dateObject);

	function outputObject(data,index){
		var beginDate="",endDate="";
		var begin;
		switch(state.timeScaleFilter){
			case 'day':
				beginDate=endDate=data.date[index];
				break;
			case 'week':
				beginDate=data.date[index];
				begin=d3.timeParse("%Y-%m-%d")(beginDate);
				var firstDayOfWeek=d3.timeParse("%Y/%U")(d3.timeFormat("%Y/%U")(begin));
				endDate=(new Date(begin.valueOf()+86400000*6)<=state.endDate?d3.timeFormat("%Y-%m-%d")(new Date(firstDayOfWeek.valueOf()+86400000*6)):d3.timeFormat("%Y-%m-%d")(state.endDate));
				break;
			case 'month':
				beginDate=data.date[index];
				begin=d3.timeParse("%Y-%m-%d")(beginDate);
				endDate=(new Date(begin.getFullYear(),begin.getMonth()+1,0)<=state.endDate?d3.timeFormat("%Y-%m-%d")(new Date(begin.getFullYear(),begin.getMonth()+1,0)):d3.timeFormat("%Y-%m-%d")(state.endDate));
				break;
			default:
				return console.log("error");
		}
		
		
		var MAU=0,WAU=0,DAU=0;
		state.userData.iosData.forEach(
			function(d){
				var currentDate=d3.timeParse("%Y-%m-%d")(d.date);
				var end=d3.timeParse("%Y-%m-%d")(endDate);
				if(currentDate<=end && currentDate>=new Date(end.valueOf()-86400000*29))
					MAU+=d.activedUser;
				if(currentDate<=end && currentDate>=new Date(end.valueOf()-86400000*6))
					WAU+=d.activedUser;
				if(d.date===endDate)
					DAU+=d.activedUser;
			}
		)
		
		state.userData.androidData.forEach(
			function(d){
				var currentDate=d3.timeParse("%Y-%m-%d")(d.date);
				var end=d3.timeParse("%Y-%m-%d")(endDate);
				if(currentDate<=end && currentDate>=new Date(end.valueOf()-86400000*29))
					MAU+=d.activedUser;
				if(currentDate<=end && currentDate>=new Date(end.valueOf()-86400000*6))
					WAU+=d.activedUser;
				if(d.date===endDate)
					DAU+=d.activedUser;
			}
		)
		
		var obj={
			"begin":beginDate,
			"end":endDate,
			"installation":data.downloads[index],
			"DevicesInUse":data.downloads[index],
			"MAU":MAU,
			"WAU":WAU,
			"DAU":DAU,
			"stickiness":(DAU/MAU*100).toFixed(1)+'%',
			"member":data.members[index],
			"bindCreditCard":data.bind[index],
			"bindLicensePlate":data.bind[index],
			"subscribe":data.subscribe[index],
			"autoPay_Taipei":data.autoPay_Taipei[index],
			"autoPay_NewTaipei":data.autoPay_NewTaipei[index],
			"autoPay_Kaohsiung":data.autoPay_Kaohsiung[index]
		}
		return obj;
	}
	
	for(var i=0; i<dataPerUnit.date.length; ++i)
		outputData.push(new outputObject(dataPerUnit,i));
	
	var sub=[];
	const out0=Object.assign({},{os:'Android'},outputData[0]);
	const out1=Object.assign({},{os:'iOS'},outputData[0]);
	sub.push(out0,out1);

	return {
		data:outputData,
		subData:sub
	}
}

const mapDispatchToProp=Dispatch=>{
	return {}
}

const UserStatusTableContainer=connect(
	mapStateToProp,
	mapDispatchToProp
)(UserStatusTable);

export default UserStatusTableContainer;
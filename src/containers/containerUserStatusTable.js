import {connect} from 'react-redux';
import UserStatusTable from '../components/UserStatusTable/UserStatusTable';
import * as d3 from 'd3';
import transform from '../utils/dataTransform';

const mapStateToProp=state=>{
	var outputData=[];
	var keys=Object.keys(state.userData.iosData[0]);
	var dataPerUnit={};
	for(var n=1; n<9; ++n){
		var lineChartData=transform(state,{'active':false,'name':keys[n]});
		var currentObject={};
		currentObject[keys[n]]=lineChartData.data.iOS.value.map(function(d,i){return d+lineChartData.data.Android.value[i]});
		dataPerUnit=Object.assign({},dataPerUnit,currentObject);
	}
	var dateObject={};
	dateObject['date']=lineChartData.data.iOS.date;
	dataPerUnit=Object.assign({},dataPerUnit,dateObject);
	console.log(dataPerUnit);
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
				//var splitedDate=data.date[index].split('-');
				//beginDate=d3.timeParse("%Y/%m/%d")(d3.timeFormat("%Y")(state.beginDate)+'/'+splitedDate[0])<=state.beginDate?d3.timeFormat("%Y/%m/%d")(state.beginDate):splitedDate[0];
				//endDate=d3.timeParse("%Y/%m/%d")(d3.timeFormat("%Y")(state.endDate)+'/'+splitedDate[1])>=state.endDate?d3.timeFormat("%Y/%m/%d")(state.endDate):splitedDate[1];
				break;
			case 'month':
				beginDate=data.date[index];
				begin=d3.timeParse("%Y-%m-%d")(beginDate);
				endDate=(new Date(begin.getFullYear(),begin.getMonth()+1,0)<=state.endDate?d3.timeFormat("%Y-%m-%d")(new Date(begin.getFullYear(),begin.getMonth()+1,0)):d3.timeFormat("%Y-%m-%d")(state.endDate));
				//var splitedDate=data.date[index].split('/');
				//beginDate=d3.timeParse("%Y/%m")(data.date[index])<=state.beginDate?d3.timeFormat("%Y/%m/%d")(state.beginDate):d3.timeFormat("%Y/%m/%d")(new Date(splitedDate[0],splitedDate[1]-1,1));
				//endDate=(new Date(splitedDate[0],splitedDate[1],0))>=state.endDate?d3.timeFormat("%Y/%m/%d")(state.endDate):d3.timeFormat("%Y/%m/%d")(new Date(splitedDate[0],splitedDate[1],0));
				break;
			default:
				return console.log("error");
		}
		//var MAU,WAU,DAU;
		//var activedData=transform(state,{'active':false,'name':'activedUser','timeFilter':'week'});
		
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
	
	return {
		data:outputData
	}
}

const mapDispatchToProp=Dispatch=>{
	return {}
}

const ContainerUserStatusTable=connect(
	mapStateToProp,
	mapDispatchToProp
)(UserStatusTable);

export default ContainerUserStatusTable;
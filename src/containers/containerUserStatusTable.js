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
		currentObject[keys[n]]=lineChartData.data.iosData.value.map(function(d,i){return d+lineChartData.data.androidData.value[i]});
		dataPerUnit=Object.assign({},dataPerUnit,currentObject);
	}
	var dateObject={};
	dateObject['date']=lineChartData.data.iosData.date;
	dataPerUnit=Object.assign({},dataPerUnit,dateObject);
	
	function outputObject(data,index){
		var beginDate="",endDate="";
		switch(state.timeScaleFilter){
			case 'day':
				beginDate=endDate=data.date[index];
				break;
			case 'week':
				var splitedDate=data.date[index].split('-');
				beginDate=d3.timeParse("%Y/%m/%d")(d3.timeFormat("%Y")(state.beginDate)+'/'+splitedDate[0])<=state.beginDate?d3.timeFormat("%Y/%m/%d")(state.beginDate):splitedDate[0];
				endDate=d3.timeParse("%Y/%m/%d")(d3.timeFormat("%Y")(state.endDate)+'/'+splitedDate[1])>=state.endDate?d3.timeFormat("%Y/%m/%d")(state.endDate):splitedDate[1];
				break;
			case 'month':
				var splitedDate=data.date[index].split('/');
				beginDate=d3.timeParse("%Y/%m")(data.date[index])<=state.beginDate?d3.timeFormat("%Y/%m/%d")(state.beginDate):d3.timeFormat("%Y/%m/%d")(new Date(splitedDate[0],splitedDate[1]-1,1));
				endDate=(new Date(splitedDate[0],splitedDate[1],0))>=state.endDate?d3.timeFormat("%Y/%m/%d")(state.endDate):d3.timeFormat("%Y/%m/%d")(new Date(splitedDate[0],splitedDate[1],0));
				break;
		}
		//var MAU,WAU,DAU;
		//var activedData=transform(state,{'active':false,'name':'activedUser','timeFilter':'week'});
		
		var obj={
			"begin":beginDate,
			"end":endDate,
			"installation":data.downloads[index],
			"DevicesInUse":data.downloads[index],
			"MAU":data.activedUser[index],
			"WAU":data.activedUser[index],
			"DAU":data.activedUser[index],
			"stickiness":0,
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
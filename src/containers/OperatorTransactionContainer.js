import {connect} from 'react-redux';
import OperatorTransaction from  "../components/Revenue/OperatorTransaction";
import * as d3 from 'd3';
import _ from 'lodash';
import Gridcalculator from '../utils/Gridcalculator';

const mapStateToProp=(state,props)=>{
	var outputData=[];
	var Today=new Date();
	var Y = Today.getFullYear();
	var M = Today.getMonth()+1;
	var days = new Date(Y,M,0).getDate();
	var d = Today.getDate();
	var begin = Y+"-"+M+"-"+d;



	var calculatedData=Gridcalculator(state,'operator',d3.timeParse("%Y-%m-%d")(begin), state.timeScaleFilter);
	

	function outputObject(data){
		var obj={
			'dataForTable':data,
			'TransactionAmount':{'date':[],'value':[]},
			'TransactionValue':{'date':[],'value':[]}
		}
		return obj;
	}

	_.times(4, function(){
		outputData.push(Gridcalculator(state,'operator', d3.timeParse("%Y-%m-%d")(Y+"-"+M+"-"+d), state.timeScaleFilter)); 
	})
console.log(outputData);
			
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
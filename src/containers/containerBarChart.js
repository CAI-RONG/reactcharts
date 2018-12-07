import {connect} from 'react-redux';
import BarChart from '../components/Charts/BarChart/BarChart';

const mapStateToProp=state=>{
	var outputData={'bank':[],'value':[]};
	var sorted=[];
	function compare(a,b){
		if(a.values<b.values)
			return 1;
		if(a.values>b.values)
			return -1;
		return 0;
	}
	sorted=state.banks.sort(compare);
	outputData.bank=sorted.map(function(d){return d.bank});
	outputData.value=sorted.map(function(d){return d.values});
	outputData.bank.splice(10);
	outputData.value.splice(10);
	return {
		data:outputData,
		name:'topTenBank'	
	}
}

const mapDispatchToProp=state=>{
	return {}
}

const ContainerBarChart=connect(
	mapStateToProp,
	mapDispatchToProp
)(BarChart);

export default ContainerBarChart;
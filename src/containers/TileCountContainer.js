import React from "react";
import {connect} from 'react-redux';
import TileCount from "../components/Revenue/TileCount";
import Gridcalculator from "../utils/Gridcalculator";
import _ from 'lodash';

const mapStateToProps=(state,props)=>{

	var outputData= Gridcalculator(state, props);
	var totalAmount =_.sumBy(outputData, 'currentAmount');
	var TotalParkingLotsAmount =_.sumBy(outputData, 'currentAmount');
	var TotalRoadsideAmount =_.sumBy(outputData, 'currentAmount');
	console.log(outputData);

	return {
		TotalAmount:totalAmount,
		TotalParkingLotsAmount:0,
		TotalRoadsideAmount:0
	}
}


const TileCountContainer=connect(
	mapStateToProps,
)(TileCount);

export default TileCountContainer;
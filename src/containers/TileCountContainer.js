import React from "react";
import {connect} from 'react-redux';
import TileCount from "../components/Revenue/TileCount";
import Gridcalculator from "../utils/Gridcalculator";
import _ from 'lodash';
import * as d3 from 'd3';

const mapStateToProps=(state,props)=>{

   	var Today=new Date();
	var Y = Today.getFullYear();
	var M = Today.getMonth();//last month
   	var days = new Date(Y,M+1,0).getDate();
   	var	endDate = Y+"-"+(M+1)+"-"+days;
   	var beginDate = Y+"-"+(M)+"-01";
 	var begin=d3.timeParse("%Y-%m-%d")(beginDate);
   	var end=d3.timeParse("%Y-%m-%d")(endDate);
 
	
	var outputData= Gridcalculator(state,  begin, end);

	var totalAmount =_.sumBy(outputData, 'currentAmount');
	var TotalParkingLotsAmount =_.sumBy(outputData, 'currentAmount');
	var TotalRoadsideAmount =_.sumBy(outputData, 'currentAmount');
	//console.log(outputData);

	return {
		Month:M,
		TotalAmount:totalAmount,
		TotalParkingLotsAmount:0,
		TotalRoadsideAmount:0,
		ratio:0
	}
}


const TileCountContainer=connect(
	mapStateToProps,
)(TileCount);

export default TileCountContainer;
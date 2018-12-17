import {connect} from 'react-redux';
import _ from 'lodash';
import * as d3 from 'd3';
import TileCount from "../components/Revenue/TileCount";
import Gridcalculator from "../utils/Gridcalculator";
import numberWithCommas from "../utils/numberWithCommas";

const mapStateToProps=(state,props)=>{
	var day = new Date();
	var m = day.getMonth();
	var y = day.getFullYear();

	var beginDate=d3.timeParse("%Y-%m-%d")(y+"-"+m+"-1");
	var ParkingLotsData= Gridcalculator(state,'operator',beginDate,'month');
	
	var TotalParkingLotsValue =_.sumBy(ParkingLotsData, 'currentValue');
	var ParkingLotsRatio=parseInt((TotalParkingLotsValue/_.sumBy(ParkingLotsData, 'lastValue')-1)*100)
	var TotalRoadsideValue = 0;


	return {
		Month:m,
		TotalValue: numberWithCommas(TotalParkingLotsValue+TotalRoadsideValue),
		TotalParkingLotsValue: numberWithCommas(TotalParkingLotsValue),
		TotalRoadsideValue:numberWithCommas(TotalRoadsideValue),
		Ratio:0,
		ParkingLotsRatio:ParkingLotsRatio,
		RoadsideRatio:0
	}
}


const TileCountContainer=connect(
	mapStateToProps,
)(TileCount);

export default TileCountContainer;
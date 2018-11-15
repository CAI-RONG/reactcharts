import React from "react";
import {connect} from 'react-redux';
import TileCount from "../components/Revenue/TileCount";

const mapStateToProps=state=>{
	return {
		data:state.data,
		title:state.title
	}
}


const TileCountContainer=connect(
	mapStateToProps,
)(TileCount);

export default TileCountContainer;
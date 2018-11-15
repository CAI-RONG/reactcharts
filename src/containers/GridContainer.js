import React from "react";
import {connect} from 'react-redux';
import Grid from "../components/Revenue/Grid";


const mapStateToProps=state=>{
	return {
		data:state.data,
		title:state.title
	}
}

const GridContainer=connect(
	mapStateToProps,
)(Grid);

export default GridContainer;
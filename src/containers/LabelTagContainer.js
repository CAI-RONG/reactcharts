import React from 'react';
import {connect} from 'react-redux';
import LabelTag from '../components/LineChart/Label';

const mapStateToProps=state=>{
	return {
		bgc:state.color,
		title:state.title,
		value:state.value
	}
}

const LabelTagContainer=connect(
	mapStateToProps
)(LabelTag);

export default LabelTagContainer;
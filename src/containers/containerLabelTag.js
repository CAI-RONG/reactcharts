import React from 'react';
import {connect} from 'react-redux';
import LabelTag from '../components/Label';

const mapStateToProps=state=>{
	return {
		bgc:state.color,
		title:state.title,
		value:state.value
	}
}

const ContainerLabelTag=connect(
	mapStateToProps
)(LabelTag);

export default ContainerLabelTag;
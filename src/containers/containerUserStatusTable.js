import React from 'react';
import {connect} from 'react-redux';
import UserStatusTable from '../components/UserStatusTable/UserStatusTable';

const mapStateToProp=state=>{
	return {}
}

const mapDispatchToProp=Dispatch=>{
	return {}
}

const ContainerUserStatusTable=connect(
	mapStateToProp,
	mapDispatchToProp
)(UserStatusTable);

export default ContainerUserStatusTable;
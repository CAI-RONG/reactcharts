import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import {Row,Col} from 'react-bootstrap';


export default class ActivedUser extends React.Component{
	render(){
		return (
			<fieldset>
				<legend><h1>Active User</h1></legend>
				<Row>
					<Col lg={4}>
						<h2>Monthly Actived Users</h2>
						<ContainerLineChart active timeFilter="month" name="activedUser"/>
					</Col>
					<Col lg={4}>
						<h2>Weekly Actived Users</h2>
						<ContainerLineChart active timeFilter="week" name="activedUser"/>
					</Col>
					<Col lg={4}>
						<h2>Daily Actived Users</h2>
						<ContainerLineChart active timeFilter="day" name="activedUser"/>
					</Col>
				</Row>
			</fieldset>
		)
	}
}
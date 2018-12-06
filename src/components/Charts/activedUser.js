import React from 'react';
import ContainerLineChart from '../../containers/containerLineChart';
import {Row,Col} from 'react-bootstrap';


export default class ActivedUser extends React.Component{
	render(){
		return (
			<div className="row">
				<div className="col-md-12 col-sm-12 col-xs-12">
            		<div className="x_panel">
						<div className="row x_title"><h3>Active User</h3></div>
				<Row>
					<Col lg={4}>
						<h5>Monthly Actived Users</h5>
						<ContainerLineChart active timeFilter="month" name="activedUser"/>
					</Col>
					<Col lg={4}>
						<h5>Weekly Actived Users</h5>
						<ContainerLineChart active timeFilter="week" name="activedUser"/>
					</Col>
					<Col lg={4}>
						<h5>Daily Actived Users</h5>
						<ContainerLineChart active timeFilter="day" name="activedUser"/>
					</Col>
				</Row>
			</div>
          </div>
          </div>
		)
	}
}
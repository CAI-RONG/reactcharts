import React from 'react';
import LineChartContainer from '../../containers/LineChartContainer';
import {Row,Col} from 'react-bootstrap';


function ActivedUser (){
	return(
		<div className="row">
			<div className="col-md-12 col-sm-12 col-xs-12">
           		<div className="x_panel">
					<div className="row x_title"><h3>Active User</h3></div>
					<Row>
						<Col lg={4}>
							<h5>Monthly Actived Users</h5>
							<LineChartContainer active timeFilter="month" name="activedUser"/>
						</Col>
						<Col lg={4}>
							<h5>Weekly Actived Users</h5>
							<LineChartContainer active timeFilter="week" name="activedUser"/>
						</Col>
						<Col lg={4}>
							<h5>Daily Actived Users</h5>
							<LineChartContainer active timeFilter="day" name="activedUser"/>
						</Col>
					</Row>
				</div>
       	 	</div>
        </div>
	)
}
export default ActivedUser;
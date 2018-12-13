import React from 'react';
import "./SideDrawer.css";
import { Link } from 'react-router-dom';

const SideDrawer = props => {

	let drawerClasses = 'side-drawer';

	if(props.show)
	{
		drawerClasses = 'side-drawer open';
	}
	

	return (
		<nav className={drawerClasses}>
			<div className="sidebar-brand">
				<a href="/">
					<p>PKLOT Dashboard</p>
				</a>
			</div>
			<div className="info" >
			    <span>Welcome,</span>
			    <h6>John Doe</h6>
			</div>
			<div className="sidebar-menu">
				<ul className="nav side-menu">
				    <br/>
				    <div>
				    	<Link to="/UserAnalyticsDashboard">
				    		<div className="div-inline"><i className="fas fa-user"/></div>
				    		<div className="div-inline">User</div>
				    	</Link>
		           		<Link to="/RevenueAnalyticsDashboard" >
		           			<div className="div-inline"><i className="fas fa-chart-line"/></div>
		           			<div className="div-inline">Revenue</div>
		           		</Link>
		           	</div>
		    	</ul>
			</div>
		</nav>
		

	);
}

export default SideDrawer;
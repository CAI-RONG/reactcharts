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
			<a style={{fontWeight: 350, color:'white',padding: '10px 10px'}} href="/">PKLOT Dashboard</a>
			{/*-- menu profile quick info --*/}
			<div className="profile clearfix">
				<div style={{padding: '18px'}}>
			    	<span>Welcome,</span>
			    	<h6>John Doe</h6>
				</div>
			</div>
			{/*-- /menu profile quick info --*/}
			<div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
			  	<div className="menu_section">
				    <ul className="nav side-menu">
				    	<br/>
				    	<Link to="/UserAnalyticsDashboard"><i className="fas fa-user"/><span style={{margin:"5px"}}/>User</Link>
		           		<Link to="/RevenueAnalyticsDashboard" ><i className="fas fa-chart-line"/><span style={{margin:"5px"}}/>Revenue</Link>
		    		</ul>
			 	</div>
			</div>
		</nav>
		

	);
}

export default SideDrawer;